import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const body = await request.json();
  const { 
    packageName, 
    packagePrice,
    date, 
    time, 
    guests, 
    location, 
    name, 
    email, 
    phone, 
    specialRequests 
  } = body;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error('Email credentials not configured');
    return NextResponse.json({
      error: 'Email credentials not configured'
    }, { status: 500 });
  }

  try {
    // Create a transporter with explicit Gmail SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      }
    });

    // Format date for display
    const formattedDate = new Date(date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    // Format time for display
    const [hours, minutes] = time.split(':');
    const timeObj = new Date();
    timeObj.setHours(parseInt(hours));
    timeObj.setMinutes(parseInt(minutes) || 0);
    const formattedTime = timeObj.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit' 
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'basketandblanketnyc@gmail.com',
      subject: `Basket & Blanket: New Booking - ${packageName} from ${name}`,
      html: `
        <h1>New Picnic Booking</h1>
        <p>You have received a new booking for a ${packageName}.</p>
        
        <h2>Package Details:</h2>
        <p><strong>Package:</strong> ${packageName} (${packagePrice})</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${formattedTime}</p>
        <p><strong>Guests:</strong> ${guests}</p>
        <p><strong>Location:</strong> ${location}</p>
        
        <h2>Customer Information:</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        
        ${specialRequests ? `<h2>Special Requests:</h2><p>${specialRequests}</p>` : ''}
        
        <p>Please log into your system to review this booking.</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ 
      error: 'Failed to send email notification',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 