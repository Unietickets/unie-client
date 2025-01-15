import seedMockData from "@/app/lib/seed";

export async function POST() {
    try {
        await seedMockData();
        return new Response('Success', {
            status: 200, 
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify('Failed to insert mock data'), {
            status: 500
        });
    }
}