export async function GET() {
  return Response.json({
    MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Not set'
  });
}
