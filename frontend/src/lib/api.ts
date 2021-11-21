import { AxiosRequestConfig } from "axios";
import { json } from "stream/consumers";
import http from "./http";

export interface BaseEvent {
  title: string;
  description: string;
  organization: string;

  email?: string;
  phone_number?: string;
  tags: string[];

  datetime: string;
  location: string;
}

export interface Event extends BaseEvent {
  _id: string;

  // Number of images in event
  count: number;
}

export interface CreateEvent extends BaseEvent {}

export interface RSVPData {
  name: string;
  phone: string;
}

const api = {
  events: {
    getEvents: (
      title?: string,
      organization?: string,
      limit?: number,
      offset?: number,
      config: AxiosRequestConfig = {},
    ) => http.get("/events/", { params: { title, organization, limit, offset }, ...config }),
    postEvent: (event: CreateEvent, config: AxiosRequestConfig = {}) =>
      http.post("/events/", event, { ...config }),
    getEvent: (id: string, config: AxiosRequestConfig = {}) =>
      http.get(`/events/${id}`, { ...config }),
    deleteEvent: (id: string, config: AxiosRequestConfig = {}) =>
      http.delete(`/events/${id}`, { ...config }),
    rsvp: (id: string, data: RSVPData) => http.post(`/events/${id}/rsvp`, data),

    images: {
      addImage: (id: string, config: AxiosRequestConfig = {}) =>
        http.patch(`/events/${id}`, { ...config }),
      getImage: (id: string, index: number, config: AxiosRequestConfig = {}) =>
        http.get(`/events/${id}/images/${index}`, { ...config }),
    },
  },
};

export default api;
