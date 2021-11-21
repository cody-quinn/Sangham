import { json } from "stream/consumers";
import http from "./http";

export interface BaseEvent {
  title: string;
  description: string;
  organization: string;
  email?: string;
  phone_number?: string;
  tags: string[];
}

export interface Event extends BaseEvent {
  _id: string;
  images: string[];
}

export interface CreateEvent extends BaseEvent {}

const api = {
  events: {
    getEvents: () => http.get("/events"),
    postEvent: (event: CreateEvent) => http.post("/events", event),
    getEvent: (id: string) => http.get(`/events/${id}`),

    images: {
      addImage: (id: string, base64: string) => http.put(`/events/${id}/images`),
    },
  },
};

export default api;
