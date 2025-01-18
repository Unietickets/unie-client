export async function fetchEvents() {
    return await prisma.event.findMany(); 
  }