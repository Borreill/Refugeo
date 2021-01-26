export class Appointment {
  photo: string;
  constructor(
    public reason: string,
    public appointmentDate: string,
    public volunteer: string,   
    public description: string
  ) {
      }
  }