import { NextResponse } from 'next/server';
import Plunk from '@plunk/node';

const plunk = new Plunk(process.env.PLUNK_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { to, summary, episodeTitle, episodeUrl } = await req.json();

    if (!to || !summary || !episodeTitle) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!process.env.PLUNK_API_KEY) {
      return NextResponse.json({ error: 'Missing Plunk API key' }, { status: 500 });
    }

    // Create a nicely formatted HTML email
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Podcast Newsletter</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #4F46E5; border-bottom: 2px solid #E5E7EB; padding-bottom: 10px;">
          🎙️ ${episodeTitle}
        </h1>
        
        <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #374151; margin-top: 0;">Quick Summary</h2>
          <p style="margin: 0;">${summary}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h2 style="color: #374151;">Key Takeaways</h2>
          <ul style="padding-left: 20px;">
            <li>AI-powered transcription and summarization</li>
            <li>Perfect for newsletters and content creation</li>
            <li>Easy integration with your workflow</li>
          </ul>
        </div>
        
        <div style="background: #FEF3C7; padding: 15px; border-left: 4px solid #F59E0B; margin: 20px 0;">
          <blockquote style="margin: 0; font-style: italic;">
            "Transform your podcast content into engaging newsletters with AI-powered insights."
          </blockquote>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${episodeUrl}" style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Listen to the Full Episode
          </a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
        
        <p style="text-align: center; color: #6B7280; font-size: 14px;">
          You're receiving this because you subscribed to Podcast2Newsletter.<br>
          <a href="#" style="color: #4F46E5;">Unsubscribe</a>
        </p>
      </body>
      </html>
    `;

    // Send the email using Plunk
    await plunk.emails.send({
      to,
      subject: `Your Podcast Newsletter: ${episodeTitle}`,
      body: htmlBody,
    });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Send newsletter error:', error);
    return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 });
  }
} 