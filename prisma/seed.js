import prisma from './prisma'; 

const seedMockData = async () => {
    // await prisma.ticket.deleteMany({});
    // await prisma.deal.deleteMany({});
    // await prisma.transaction.deleteMany({});
    // await prisma.verificationDocument.deleteMany({});
    // await prisma.event.deleteMany({});
    // await prisma.user.deleteMany({});

    let users = await prisma.user.findMany();

    if (users.length === 0) {
        users = await prisma.user.createMany({
            data: [
                { name: 'Alice', registration_date: new Date(), verification_status: 'Verified', email: 'amir@mial.ru', password: '123', phone_number: '1234567890', is_active: true },
                { name: 'Bob', registration_date: new Date(), verification_status: 'NotVerified', email: 'bob@example.com', password: 'hashed_password_2', phone_number: '0987654321', is_active: true },
                { name: 'Charlie', registration_date: new Date(), verification_status: 'Verified', email: 'charlie@example.com', password: 'hashed_password_3', phone_number: '5555555555', is_active: true },
            ],
        });
    }

    const verificationDocuments = await prisma.verificationDocument.createMany({
        data: [
            { user_id: 1, upload_date: new Date(), document_image: 'doc_image_1.png', verification_status: 'Verified' },
            { user_id: 1, upload_date: new Date(), document_image: 'doc_image_2.png', verification_status: 'NotVerified' },
            { user_id: 2, upload_date: new Date(), document_image: 'doc_image_3.png', verification_status: 'Reupload' },
            { user_id: 3, upload_date: new Date(), document_image: 'doc_image_4.png', verification_status: 'Verified' },
        ],
    });

    const transactions = await prisma.transaction.createMany({
        data: [
            { user_id: 1, direction: 'deposit', amount: 100.00, transaction_date: new Date(), status: 'completed' },
            { user_id: 1, direction: 'withdraw', amount: 50.00, transaction_date: new Date(), status: 'completed' },
            { user_id: 2, direction: 'deposit', amount: 200.00, transaction_date: new Date(), status: 'created' },
            { user_id: 3, direction: 'withdraw', amount: 150.00, transaction_date: new Date(), status: 'in_process' },
        ],
    });

    const events = await prisma.event.createMany({
        data: [
            { name: 'Concert', status: 'coming', genre: 'Music', tickets_available: 100, tickets_sold: 0, event_date: new Date('2023-12-01T20:00:00Z'), location: 'Stadium', description: 'A great music concert.' },
            { name: 'Football Match', status: 'coming', genre: 'Sports', tickets_available: 200, tickets_sold: 0, event_date: new Date('2023-12-05T18:00:00Z'), location: 'Stadium', description: 'A thrilling football match.' },
            { name: 'Art Exhibition', status: 'completed', genre: 'Art', tickets_available: 50, tickets_sold: 50, event_date: new Date('2023-11-15T10:00:00Z'), location: 'Gallery', description: 'An exhibition of modern art.' },
        ],
    });

    try {
        const tickets = await prisma.ticket.createMany({
            data: [
                { user_id: 1, event_id: 1, upload_date: new Date(), image: 'ticket_image_1.png', status: 'verified' },
                { user_id: 1, event_id: 2, upload_date: new Date(), image: 'ticket_image_2.png', status: 'unverified' },
                { user_id: 2, event_id: 1, upload_date: new Date(), image: 'ticket_image_3.png', status: 'unverified' },
                { user_id: 3, event_id: 3, upload_date: new Date(), image: 'ticket_image_4.png', status: 'verified' },
            ],
        });
    } catch (e) {
        console.error(e)
    }

    const deals = await prisma.deal.createMany({
        data: [
            { event_id: 1, buyer_id: 1, seller_id: 2, deal_date: new Date('2023-11-01T20:00:00Z'), status: 'in_progress', price: 75 },
            { event_id: 1, buyer_id: 3, seller_id: 1, deal_date: new Date('2023-11-02T20:00:00Z'), status: 'completed', price: 124 },
            { event_id: 1, buyer_id: 2, seller_id: 3, deal_date: new Date('2023-11-03T20:00:00Z'), status: 'declined', price: 370 },
        ]
    })
};

export default seedMockData;