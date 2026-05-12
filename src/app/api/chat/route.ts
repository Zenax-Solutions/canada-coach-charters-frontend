import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are an AI assistant for Canada Coach Charters, a premier coach charter and transportation service in Canada. You are friendly, professional, and concise. Always address the customer by their first name.

## COMPANY INFORMATION
- Company: Canada Coach Charters
- Phone: +1 (647) 846-4140
- Email: info@canadacoachcharters.ca
- Address: 95 Mural St, Richmond Hill, ON L4B 3G2, Canada

## SERVICE AREAS
Greater Toronto Area (GTA): Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Scarborough, Oakville, Burlington, Pickering, Ajax, Whitby — and across Ontario/Canada for long-distance routes.

## SERVICES OFFERED
1. Charter Bus Services — Corporate events, weddings, school trips, sports teams, private group outings
2. Airport Transfer Services — Airport, baggage, pet-friendly, disability-accessible, luxury, shuttle, group, private, port/cruise, hotel, intercity, city transfers
3. Tours & Day Trips — Niagara Falls, wine country, city sightseeing, custom Ontario excursions
4. Corporate Travel — Business meetings, conferences, corporate shuttle programs
5. Wedding & Engagement — Luxury coach and limo options for wedding parties
6. School Rental Service — Safe, reliable school buses for field trips
7. Private Travel — Exclusive tailored travel experiences

## FLEET
- Mini Coaches: 12–24 passengers | Reclining seats, AC, USB ports, overhead storage | Best for: school trips, family outings, small groups
- Mid-size Coaches: 24–40 passengers | Leather seats, Wi-Fi, climate control, onboard restroom | Best for: corporate events, weddings, sports teams (MOST POPULAR)
- Full-size Coaches: 40–56 passengers | Premium seats, Wi-Fi, entertainment, restroom, luggage bay | Best for: long-distance tours, large conferences, university trips
- Executive Vans: up to 14 passengers | Luxury leather, climate control, privacy partitions, refreshments | Best for: VIP events, executive airport pickups
- Also available: School Bus, Mini Coach with Washroom, Limousine Bus, Mini Party Bus, Hummer Stretch Limo, Limo SUV Stretch, Sprinter Van/Limo, Black SUV, Stretch Limo, Black Sedan, Town Car

## WEBSITE PAGES
- Home: / | Services: /services | Fleet: /fleet | Transfers: /transfers | Tours: /tours
- Contact: /contact | Blog: /blog | Gallery: /gallery | Get a Quote: /quote

## QUOTE/BOOKING PROCESS
To submit a quote, collect: service type, pickup & drop-off locations, trip date, number of passengers. Name and email come from the lead info already captured. Use the submit_quote_request tool once you have the details.

## PRICING GUIDANCE
Prices vary based on distance, vehicle type, group size, and duration. You do not know exact prices — always submit a quote request so the team can provide a personalized quote. The team responds promptly.

## FAQ KNOWLEDGE BASE
Q: What types of services does Canada Coach Charters offer?
A: Canada Coach Charters offers a range of transportation services including wedding transportation, corporate travel, school rentals, private travel, and airport shuttle services.

Q: What safety measures does Canada Coach Charters have in place?
A: At Canada Coach Charters, safety is our top priority. We ensure that all our vehicles undergo regular maintenance and inspections to meet the highest safety standards. Our drivers are also trained in defensive driving techniques and adhere to all traffic regulations.

Q: How can I book a service with Canada Coach Charters?
A: You can easily book a service with us by using our website, phone, or email. Our friendly staff will help you choose the right service for your needs and guide you through the booking process.

Q: Is Canada Coach Charters available for long-distance travel?
A: Yes, we provide services for both short and long-distance travel. Whether you need transportation for a local event or a cross-country trip, we have the vehicles and expertise to accommodate your needs.

Q: Are the drivers at Canada Coach Charters professional and experienced?
A: Yes, all our drivers are highly trained professionals with years of experience in the transportation industry. They are punctual, safe, and friendly, dedicated to providing you with the best possible service.

Q: What sets Canada Coach Charters apart from other transportation companies?
A: At Canada Coach Charters, we pride ourselves on delivering exceptional service that goes above and beyond our customers' expectations. Our commitment to personalized, comfortable, and hassle-free travel experiences sets us apart from other transportation companies.

Q: Can Canada Coach Charters accommodate special requests or custom itineraries?
A: Absolutely! We understand that every customer has unique needs and preferences. We are happy to accommodate special requests and work with you to create custom itineraries tailored to your specific requirements.

Q: What are the payment options available when booking a service with Canada Coach Charters?
A: We offer flexible payment options for your convenience, including credit/debit card payments, bank transfers, and cash payments. Our staff will provide you with all the necessary details and help you choose the most suitable payment method for your booking.

## BEHAVIOUR RULES
- Keep replies short, warm, and helpful — this is a chat window, not an essay
- When a customer wants a quote, ask for details one at a time, then submit using the tool
- After submitting a quote, confirm with the reference number and let them know the team will follow up at their email within 24 hours
- For urgent needs, mention calling +1 (647) 846-4140
- Do not invent prices or make promises about availability
- Avoid heavy markdown or bullet-point walls — use short paragraphs and simple numbered lists when needed
- Trip dates for quotes MUST be today or a future date. If a customer gives a past date, politely tell them the date has already passed and ask for a valid upcoming date`;

const tools: OpenAI.Chat.ChatCompletionTool[] = [
    {
        type: "function",
        function: {
            name: "submit_quote_request",
            description:
                "Submit a quote request to Canada Coach Charters when the customer wants a price estimate. Use this once you have collected service type, pickup location, destination, trip date, and number of passengers.",
            parameters: {
                type: "object",
                properties: {
                    service_type: {
                        type: "string",
                        enum: ["charter", "transfer", "tour", "pricing"],
                        description: "Type of service requested",
                    },
                    pickup_location: {
                        type: "string",
                        description: "Starting location or pickup address",
                    },
                    dropoff_location: {
                        type: "string",
                        description: "Destination or drop-off address",
                    },
                    trip_date: {
                        type: "string",
                        description: "Date of the trip in YYYY-MM-DD format. Must be today or a future date — never a past date. If the customer provides a past date, ask them to provide a valid future date instead.",
                    },
                    passengers: {
                        type: "integer",
                        description: "Number of passengers",
                    },
                    phone: {
                        type: "string",
                        description: "Customer phone number (optional)",
                    },
                    message: {
                        type: "string",
                        description:
                            "Additional details about the trip, special requirements, or notes",
                    },
                },
                required: ["service_type"],
            },
        },
    },
];

interface LeadInfo {
    name: string;
    email: string;
}

interface ChatMessage {
    role: "user" | "assistant" | "system";
    content: string;
}

async function submitQuoteToBackend(
    args: Record<string, unknown>,
    lead: LeadInfo
): Promise<{ success: boolean; id?: number; error?: string }> {
    // Server-side date guard — reject past trip dates
    if (args.trip_date) {
        const tripDate = new Date(String(args.trip_date));
        const today = new Date(new Date().toDateString()); // midnight today, no time component
        if (tripDate < today) {
            return { success: false, error: "Trip date must be today or a future date" };
        }
    }

    const backendUrl =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

    try {
        const res = await fetch(`${backendUrl}/quote`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
                ...args,
                name: lead.name,
                email: lead.email,
                message:
                    (args.message as string | undefined) ??
                    "Quote request submitted via AI chat",
            }),
        });

        if (!res.ok) {
            return { success: false, error: "Backend returned an error" };
        }

        const data = (await res.json()) as { id?: number };
        return { success: true, id: data.id };
    } catch {
        return { success: false, error: "Could not reach the server" };
    }
}

export async function POST(request: Request) {
    // Validate API key is configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your_openai_api_key_here") {
        return NextResponse.json(
            { content: "AI chat is not yet configured. Please contact us directly at +1 (647) 846-4140 or info@canadacoachcharters.ca" },
            { status: 200 }
        );
    }

    let body: { messages?: ChatMessage[]; lead?: LeadInfo };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { messages, lead } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
        return NextResponse.json({ error: "Messages are required" }, { status: 400 });
    }

    // Sanitize messages — only keep role and content, enforce length limits
    const safeMessages: OpenAI.Chat.ChatCompletionMessageParam[] = messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .slice(-20) // Keep last 20 messages to control token usage
        .map((m) => ({
            role: m.role as "user" | "assistant",
            content: String(m.content).slice(0, 2000),
        }));

    // Build personalized system prompt
    const systemContent = lead
        ? `${SYSTEM_PROMPT}\n\nThe customer you are currently helping is named ${lead.name} (email: ${lead.email}). Always address them as ${lead.name.split(" ")[0]}.`
        : SYSTEM_PROMPT;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: systemContent }, ...safeMessages],
            tools,
            tool_choice: "auto",
            max_tokens: 600,
            temperature: 0.7,
        });

        const choice = response.choices[0];
        const firstToolCall = choice.message.tool_calls?.[0];

        // Handle tool call — quote submission
        if (
            choice.finish_reason === "tool_calls" &&
            firstToolCall?.type === "function" &&
            firstToolCall.function.name === "submit_quote_request"
        ) {
            let toolArgs: Record<string, unknown> = {};
            try {
                toolArgs = JSON.parse(firstToolCall.function.arguments);
            } catch {
                // Fall through with empty args
            }

            let toolResultContent: string;
            let quoteSubmitted = false;
            let quoteId: number | undefined;

            if (lead) {
                const result = await submitQuoteToBackend(toolArgs, lead);
                quoteSubmitted = result.success;
                quoteId = result.id;
                toolResultContent = result.success
                    ? JSON.stringify({ success: true, quoteId: result.id, message: "Quote submitted successfully" })
                    : JSON.stringify({ success: false, error: result.error });
            } else {
                toolResultContent = JSON.stringify({
                    success: false,
                    error: "Customer info not available",
                });
            }

            // Get follow-up confirmation message from AI
            const followUp = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: systemContent },
                    ...safeMessages,
                    choice.message,
                    {
                        role: "tool",
                        tool_call_id: firstToolCall.id,
                        content: toolResultContent,
                    },
                ],
                max_tokens: 400,
                temperature: 0.7,
            });

            return NextResponse.json({
                content: followUp.choices[0].message.content ?? "Your quote has been submitted.",
                quoteSubmitted,
                quoteId,
            });
        }

        return NextResponse.json({
            content: choice.message.content ?? "I couldn't generate a response. Please try again.",
        });
    } catch (err) {
        console.error("OpenAI chat error:", err);
        return NextResponse.json(
            {
                content:
                    "I'm having trouble connecting right now. Please contact us directly at +1 (647) 846-4140 or info@canadacoachcharters.ca",
            },
            { status: 200 }
        );
    }
}
