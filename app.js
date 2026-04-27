require('dotenv').config();
const mysql = require('mysql2/promise');

async function checkDatabase(region, host) {
  console.log(`Attempting connection to ${region} at ${host}...`);
  const connection = await mysql.createConnection({
    host: host,
    user: 'admin',
    password: 'Aisha2024!',
    database: 'failovertest',
    connectTimeout: 5000
  });

  const [rows] = await connection.execute(
    'SELECT NOW() as time, @@hostname as host, "online" as status'
  );
  console.log(`✅ Connected to ${region}:`, rows[0]);
  await connection.end();
  return { region, ...rows[0] };
}

async function run() {
  const primary = process.env.DB_HOST_PRIMARY;
  const secondary = process.env.DB_HOST_SECONDARY;

  try {
    console.log('\n🔍 Testing PRIMARY region (us-east-1)...');
    const result = await checkDatabase('PRIMARY', primary);
    console.log('\n✅ PRIMARY is healthy — no failover needed');
    console.log('Result:', result);
  } catch (err) {
    console.log('\n❌ PRIMARY failed!', err.message);
    console.log('🔄 Initiating FAILOVER to secondary region (us-west-2)...');
    try {
      const result = await checkDatabase('SECONDARY', secondary);
      console.log('\n✅ FAILOVER SUCCESSFUL — now running on secondary');
      console.log('Result:', result);
    } catch (err2) {
      console.log('\n💀 Both regions failed!', err2.message);
    }
  }
}

run();