import { NextRequest, NextResponse } from 'next/server';
import { eq, lt, and, inArray } from 'drizzle-orm';
import { database } from '@/db/connection';
import { appointments } from '@/db/schema';

export async function GET(request: NextRequest) {

  const token = request.headers.get('cron-job-token');

  if (!token) {
    return NextResponse.json({ error: 'No Token provided' }, { status: 401 });
  }

  if(token !== process.env.CRON_JOB_SECRET) {
    return NextResponse.json({ error: 'Invalid token provided' }, { status: 401 });
  }
  try {
    
    // Convert current date to a Date object
    const currentDate = new Date()
    // Find appointments that are expired
    const expiredAppointments = await database
      .select()
      .from(appointments)
      .where(and(
        lt(appointments.appointmentDateTime, currentDate),
        eq(appointments.status, 'SCHEDULED')
      ));
    console.log(expiredAppointments)
    // Update the status of expired appointments
    if (expiredAppointments.length > 0) {
      await database
        .update(appointments)
        .set({ status: 'EXPIRED' })
        .where(inArray(appointments.id, expiredAppointments.map(app => app.id)));
    }

    return NextResponse.json({
      message: 'Expired appointments updated successfully',
      count: expiredAppointments.length
    });
  } catch (error) {
    console.error('Error checking appointments:', error);
    return NextResponse.json({ error: 'An error occurred while checking appointments' }, { status: 500 });
  }
}