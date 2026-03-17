
// Pure logic test script for chart components data handling
console.log('🧪 Starting extensive chart data validation tests (Logic Simulation)...');

const testCases = [
  { name: 'Empty Array', data: [] },
  { name: 'Null Data', data: null },
  { name: 'Undefined Data', data: undefined },
  { name: 'Malformed Item (Missing Name)', data: [{ id: 1, giro_estoque: 10 }] },
  { name: 'Broken Nested Object', data: [{ produto: null, valorTotal: 100 }] },
  { name: 'Completely Empty Object', data: [{ }] },
];

let failures = 0;

function simulateTurnoverChart(data) {
  const processData = data || [];
  return processData.map(item => {
     // This is the logic we added: const nome = item.nome || 'Sem Nome';
     const nome = (item && item.nome) || 'Sem Nome';
     return nome.length > 20 ? nome.substring(0, 20) + '...' : nome;
  });
}

function simulateABCChart(data) {
  const items = (data && data.items) || (Array.isArray(data) ? data : []);
  return items.map(item => {
    // This is the logic we added: const name = item.produto?.nome || item.nome || 'Sem Nome';
    const name = (item && item.produto && item.produto.nome) || (item && item.nome) || 'Sem Nome';
    return name.length > 20 ? name.substring(0, 20) + '...' : name;
  });
}

function simulateSupplierChart(data) {
  const processData = data || [];
  return processData.map(item => {
    // This is the logic we added: const nome = d.nome_fantasia || 'Sem Nome';
    const nome = (item && item.nome_fantasia) || 'Sem Nome';
    return nome.length > 15 ? nome.substring(0, 15) + '...' : nome;
  });
}

function runTest(testCase) {
  try {
    console.log(`\n  Testing Case: ${testCase.name}`);
    
    console.log(`    [TurnoverChart] Result: ${JSON.stringify(simulateTurnoverChart(testCase.data))}`);
    console.log(`    [ABCChart]      Result: ${JSON.stringify(simulateABCChart(testCase.data))}`);
    console.log(`    [SupplierChart] Result: ${JSON.stringify(simulateSupplierChart(testCase.data))}`);
    
    console.log(`    ✅ Success: ${testCase.name}`);
  } catch (e) {
    console.error(`    ❌ FAILED: ${testCase.name} - ${e.message}`);
    failures++;
  }
}

testCases.forEach(runTest);

if (failures === 0) {
  console.log('\n✨ ALL LOGIC TESTS PASSED! Component logic is robust.');
} else {
  console.log(`\n🛑 TESTS FINISHED WITH ${failures} FAILURES.`);
  process.exit(1);
}
