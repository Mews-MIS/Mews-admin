import HttpClient from "../services/HttpClient";

const CalendarAPI = {
  postSchedule: async (uploadSchedule: any) => {
    try {
      const path = "calendar/getall";
      const { data } = await HttpClient.post(path, uploadSchedule);
      console.log(data);
      return data;

    } catch (e) {
      console.log(e);
    }
  },
  getSchedule: async () => {
    try {
      const path = "calendar/write";
      const { data } = await HttpClient.get(path);
      console.log(data);
      return data;

    } catch (e) {
      console.log(e);
    }
  },
  deleteSchedule: async (calendarId: string) => {
    try {
      const path = `calendar/delete/${calendarId}`;
      const { data } = await HttpClient.delete(path);
      console.log(data);
      return data;

    } catch (e) {
      console.log(e);
    }
  }
};

export default CalendarAPI;