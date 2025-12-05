



export async function GET(req: Request) {


  return new Response(JSON.stringify({
    mes: "Hello World",
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
