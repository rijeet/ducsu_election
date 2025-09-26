import { dbConnect } from "@/lib/mongodb";
import Panel from "@/models/Panel";

export async function GET() {
  await dbConnect();
  const panels = await Panel.find({});
  return Response.json(panels);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const { name, description } = body;
  
  const panel = await Panel.create({ name, description });
  return Response.json(panel);
}
