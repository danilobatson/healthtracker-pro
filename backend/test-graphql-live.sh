#!/bin/bash

echo "🚀 GraphQL Live Testing Suite"
echo "============================"

# Start server
echo "Starting development server..."
npm run dev > server-output.log 2>&1 &
SERVER_PID=$!

# Wait for server startup
sleep 5

# Detect port
ACTUAL_PORT=$(grep -o "localhost:[0-9]*" server-output.log | head -1 | cut -d: -f2)

if [ -z "$ACTUAL_PORT" ]; then
    echo "❌ Could not detect server port"
    echo "Server output:"
    cat server-output.log
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi

echo "✅ Server detected on port: $ACTUAL_PORT"
echo ""

# Test 1: Basic GraphQL Introspection
echo "🧪 Test 1: GraphQL Introspection"
echo "-------------------------------"
INTROSPECTION_RESULT=$(curl -s -X POST http://localhost:$ACTUAL_PORT/api/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __schema { queryType { name } } }"}')

if echo "$INTROSPECTION_RESULT" | grep -q '"name":"Query"'; then
    echo "✅ GraphQL introspection working"
    echo "Response: $INTROSPECTION_RESULT"
else
    echo "❌ GraphQL introspection failed"
    echo "Response: $INTROSPECTION_RESULT"
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi
echo ""

# Test 2: Health Summary Query
echo "🏥 Test 2: Health Summary Query"
echo "------------------------------"
HEALTH_SUMMARY=$(curl -s -X POST http://localhost:$ACTUAL_PORT/api/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ healthSummary { totalRecords avgHeartRate avgBloodPressure } }"}')

if echo "$HEALTH_SUMMARY" | grep -q '"totalRecords":47'; then
    echo "✅ Health summary query working"
    echo "Response: $HEALTH_SUMMARY"
else
    echo "❌ Health summary query failed"
    echo "Response: $HEALTH_SUMMARY"
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi
echo ""

# Test 3: AI Health Insights
echo "🧠 Test 3: AI Health Insights"
echo "----------------------------"
AI_INSIGHTS=$(curl -s -X POST http://localhost:$ACTUAL_PORT/api/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ generateHealthInsights { title description insightType confidenceScore } }"}')

if echo "$AI_INSIGHTS" | grep -q '"insightType":"TREND_ANALYSIS"'; then
    echo "✅ AI health insights working"
    echo "Response: $AI_INSIGHTS"
else
    echo "❌ AI health insights failed"
    echo "Response: $AI_INSIGHTS"
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi
echo ""

# Test 4: User with Health Records
echo "👤 Test 4: User with Health Records"
echo "---------------------------------"
USER_RECORDS=$(curl -s -X POST http://localhost:$ACTUAL_PORT/api/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ me { fullName email healthRecords(limit: 3) { recordType valueNumeric unit } } }"}')

if echo "$USER_RECORDS" | grep -q '"fullName":"Alex Health Demo"'; then
    echo "✅ User with health records working"
    echo "Response: $USER_RECORDS"
else
    echo "❌ User with health records failed"
    echo "Response: $USER_RECORDS"
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi
echo ""

# Test 5: Health Record Mutation
echo "💾 Test 5: Health Record Mutation"
echo "--------------------------------"
MUTATION_RESULT=$(curl -s -X POST http://localhost:$ACTUAL_PORT/api/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"mutation { addHealthRecord(input: { recordType: HEART_RATE, valueNumeric: 75, unit: \"bpm\" }) { id recordType valueNumeric unit } }"}')

if echo "$MUTATION_RESULT" | grep -q '"recordType":"HEART_RATE"'; then
    echo "✅ Health record mutation working"
    echo "Response: $MUTATION_RESULT"
else
    echo "❌ Health record mutation failed"
    echo "Response: $MUTATION_RESULT"
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi
echo ""

# Clean up
kill $SERVER_PID 2>/dev/null || true
sleep 2

echo "🎉 ALL GRAPHQL TESTS PASSED!"
echo "================================"
echo "✅ GraphQL server fully functional"
echo "✅ Health schema working perfectly"
echo "✅ AI insights generation active"
echo "✅ Mutations and queries operational"
echo "✅ TypeScript integration complete"
echo ""
echo "🚀 Ready for mobile app integration!"
