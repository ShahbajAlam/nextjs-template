import fetchEventById from "@/actions/fetchEventById";
import { Button } from "@/components/ui/button";
import { EventProps } from "@/database/event-model";
import { CalendarDays, IndianRupeeIcon, LocateFixedIcon } from "lucide-react";

export default async function page({
    params,
}: {
    params: {
        id: string;
    };
}) {
    const data = (await fetchEventById(params.id)) as string;
    const event = JSON.parse(data) as EventProps;

    return (
        <main className="min-h-[calc(100dvh-68px)] flex justify-between items-center">
            <section className="basis-[40%] space-y-4">
                <img
                    src={event.image}
                    alt={`${event.title} image`}
                    className="aspect-video object-cover"
                />
                <p>{event.description}</p>
            </section>

            <section className="basis-[50%] flex flex-col gap-3">
                <h2>{event.title}</h2>
                <div className="flex gap-3 items-center">
                    <LocateFixedIcon />
                    <h3>{event.address}</h3>
                </div>

                <div className="flex gap-3 items-center">
                    <IndianRupeeIcon />
                    <h3>{event.price} /- per person</h3>
                </div>

                <div className="flex gap-3 items-center">
                    <CalendarDays />
                    <h3>{new Date(event.date).toDateString()}</h3>
                </div>

                <Button variant="default" className="uppercase">
                    Grab your ticket now
                </Button>
            </section>
        </main>
    );
}
