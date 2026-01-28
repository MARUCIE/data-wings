"""
NL2SQL 测试用例

测试自然语言查询的准确性和性能
"""

import os
import sys
from dataclasses import dataclass

# 如果没有安装 openai，提示安装
try:
    from nl2sql_engine import NL2SQLEngine, QueryResult
except ImportError as e:
    print(f"依赖缺失: {e}")
    print("请运行: pip install openai")
    sys.exit(1)


@dataclass
class TestCase:
    """测试用例"""
    name: str                    # 测试名称
    question: str                # 自然语言问题
    expected_keywords: list[str] # SQL 中应包含的关键词
    category: str                # 类别：basic, funnel, retention, advanced


# 测试用例集
TEST_CASES = [
    # 基础查询
    TestCase(
        name="日活趋势",
        question="过去 7 天的日活用户数",
        expected_keywords=["COUNT", "DISTINCT", "user_id", "toDate", "GROUP BY"],
        category="basic",
    ),
    TestCase(
        name="今日 PV",
        question="今天的页面浏览量",
        expected_keywords=["COUNT", "page_view", "today"],
        category="basic",
    ),
    TestCase(
        name="设备分布",
        question="各设备类型的用户数量",
        expected_keywords=["device_type", "COUNT", "GROUP BY"],
        category="basic",
    ),
    TestCase(
        name="渠道来源",
        question="不同 UTM 来源的用户数量排名",
        expected_keywords=["utm_source", "COUNT", "ORDER BY"],
        category="basic",
    ),

    # 漏斗分析
    TestCase(
        name="注册转化",
        question="注册到付费的转化率",
        expected_keywords=["signup", "purchase", "COUNT"],
        category="funnel",
    ),
    TestCase(
        name="购物车漏斗",
        question="浏览商品到添加购物车到结算的转化漏斗",
        expected_keywords=["page_view", "add_to_cart", "checkout"],
        category="funnel",
    ),

    # 留存分析
    TestCase(
        name="7日留存",
        question="新用户的 7 日留存率",
        expected_keywords=["7", "user_id", "dateDiff"],
        category="retention",
    ),
    TestCase(
        name="周留存趋势",
        question="过去一个月每周的用户留存率变化",
        expected_keywords=["user_id", "GROUP BY"],
        category="retention",
    ),

    # 高级查询
    TestCase(
        name="收入分析",
        question="过去 30 天每日收入趋势",
        expected_keywords=["SUM", "revenue", "toDate", "GROUP BY"],
        category="advanced",
    ),
    TestCase(
        name="ARPU",
        question="付费用户的平均收入",
        expected_keywords=["AVG", "revenue", "purchase"],
        category="advanced",
    ),
    TestCase(
        name="高价值用户",
        question="总消费金额最高的前 10 名用户",
        expected_keywords=["SUM", "revenue", "user_id", "ORDER BY", "LIMIT", "10"],
        category="advanced",
    ),
]


def run_tests(engine: NL2SQLEngine, verbose: bool = True) -> dict:
    """
    运行所有测试用例

    Returns:
        测试结果统计
    """
    results = {
        "total": len(TEST_CASES),
        "passed": 0,
        "failed": 0,
        "errors": 0,
        "avg_latency_ms": 0,
        "details": [],
    }

    total_latency = 0

    for tc in TEST_CASES:
        if verbose:
            print(f"\n{'='*60}")
            print(f"测试: {tc.name} ({tc.category})")
            print(f"问题: {tc.question}")
            print("-" * 40)

        result = engine.query(tc.question)
        total_latency += result.latency_ms

        # 检查是否有错误
        if result.error:
            status = "ERROR"
            results["errors"] += 1
            if verbose:
                print(f"状态: ERROR - {result.error}")
        else:
            # 检查关键词
            sql_upper = result.sql.upper()
            missing_keywords = [
                kw for kw in tc.expected_keywords
                if kw.upper() not in sql_upper
            ]

            if not missing_keywords:
                status = "PASS"
                results["passed"] += 1
            else:
                status = "FAIL"
                results["failed"] += 1

            if verbose:
                print(f"SQL:\n{result.sql}")
                print(f"\n解释: {result.explanation}")
                print(f"置信度: {result.confidence:.0%}")
                print(f"延迟: {result.latency_ms}ms")
                print(f"状态: {status}")
                if missing_keywords:
                    print(f"缺失关键词: {missing_keywords}")

        results["details"].append({
            "name": tc.name,
            "category": tc.category,
            "status": status,
            "latency_ms": result.latency_ms,
            "confidence": result.confidence if not result.error else 0,
        })

    results["avg_latency_ms"] = total_latency // len(TEST_CASES)

    return results


def print_summary(results: dict):
    """打印测试摘要"""
    print("\n" + "=" * 60)
    print("测试摘要")
    print("=" * 60)
    print(f"总计: {results['total']}")
    print(f"通过: {results['passed']} ({results['passed']/results['total']:.0%})")
    print(f"失败: {results['failed']}")
    print(f"错误: {results['errors']}")
    print(f"平均延迟: {results['avg_latency_ms']}ms")

    # 按类别统计
    categories = {}
    for detail in results["details"]:
        cat = detail["category"]
        if cat not in categories:
            categories[cat] = {"total": 0, "passed": 0}
        categories[cat]["total"] += 1
        if detail["status"] == "PASS":
            categories[cat]["passed"] += 1

    print("\n按类别统计:")
    for cat, stats in categories.items():
        rate = stats["passed"] / stats["total"]
        print(f"  {cat}: {stats['passed']}/{stats['total']} ({rate:.0%})")


def main():
    """主函数"""
    # 检查 API Key
    api_key = os.getenv("DEEPSEEK_API_KEY")
    if not api_key:
        print("=" * 60)
        print("NL2SQL 技术 Spike - 测试模式")
        print("=" * 60)
        print()
        print("未检测到 DEEPSEEK_API_KEY，进入模拟测试模式。")
        print()
        print("要运行真实测试，请设置 API Key：")
        print("  export DEEPSEEK_API_KEY=your_key")
        print()
        print("测试用例预览：")
        print("-" * 40)
        for tc in TEST_CASES:
            print(f"  [{tc.category}] {tc.name}: {tc.question}")
        print()
        print("共 {} 个测试用例，覆盖 basic/funnel/retention/advanced 四类场景。".format(len(TEST_CASES)))
        return

    print("=" * 60)
    print("NL2SQL 技术 Spike - 真实测试")
    print("=" * 60)

    # 创建引擎
    try:
        engine = NL2SQLEngine(llm_provider="deepseek")
    except Exception as e:
        print(f"初始化失败: {e}")
        return

    # 运行测试
    results = run_tests(engine, verbose=True)

    # 打印摘要
    print_summary(results)

    # 技术决策建议
    print("\n" + "=" * 60)
    print("技术决策建议")
    print("=" * 60)

    pass_rate = results["passed"] / results["total"]
    avg_latency = results["avg_latency_ms"]

    if pass_rate >= 0.8 and avg_latency < 3000:
        print("OK 测试通过率 >= 80%，延迟 < 3s")
        print("建议：DeepSeek 作为主 LLM，可以进入开发阶段")
    elif pass_rate >= 0.6:
        print("WARN 测试通过率 60-80%")
        print("建议：需要优化 Prompt 或增加业务术语词典")
    else:
        print("ERROR 测试通过率 < 60%")
        print("建议：需要更换模型或重新设计 Schema 映射策略")


if __name__ == "__main__":
    main()
