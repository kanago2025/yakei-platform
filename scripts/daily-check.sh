#!/bin/bash
echo "=== 宅学苑项目每日检查 ==="
echo "检查时间: $(date)"
echo ""
echo "📊 知识点页面统计:"
business_count=$(find src/views/notes/business -name "*.vue" 2>/dev/null | wc -l)
rights_count=$(find src/views/notes/rights -name "*.vue" 2>/dev/null | wc -l)
echo "宅建业法: $business_count/16"
echo "权利关系: $rights_count/17"
echo "总计: $((business_count + rights_count))/47"
echo "=== 检查完成 ==="
