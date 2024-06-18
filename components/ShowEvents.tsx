"use client";

import { useEffect, useState } from "react";
import { PaginationButton } from "./Pagination";
import fetchEvents from "@/actions/fetchEvents";
import { EventProps } from "@/database/event-model";

export default function ShowEvents({ eventCount }: { eventCount: number }) {
    const [page, setPage] = useState(1);
    const FIRST_PAGE = 1;
    const LAST_PAGE = Math.ceil(eventCount / 10);
    const [events, setEvents] = useState<Array<EventProps>>([]);

    const prevPageHandler = () => {
        setPage((oldPage) => {
            if (oldPage === FIRST_PAGE) return oldPage;
            return oldPage - 1;
        });
    };

    const nextPageHandler = () => {
        setPage((oldPage) => {
            if (oldPage === LAST_PAGE) return oldPage;
            return oldPage + 1;
        });
    };

    useEffect(() => {
        (async () => {
            const data = (await fetchEvents(page)) as string;
            setEvents(JSON.parse(data));
        })();
    }, [page]);

    return (
        <div className="w-full flex flex-col gap-5 py-4">
            <ul className="grid grid-cols-3 gap-4">
                {events.map((event) => (
                    <li key={event._id}>{event.title}</li>
                ))}
            </ul>

            {eventCount > 10 && (
                <PaginationButton
                    page={page}
                    FIRST_PAGE={FIRST_PAGE}
                    LAST_PAGE={LAST_PAGE}
                    prevPageHandler={prevPageHandler}
                    nextPageHandler={nextPageHandler}
                />
            )}
        </div>
    );
}