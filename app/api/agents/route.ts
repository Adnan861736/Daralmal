import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { company, manager, email, phone, address, notes } = await request.json();

    if (!company || !manager || !phone) {
      return NextResponse.json({ error: 'الحقول المطلوبة غير مكتملة' }, { status: 400 });
    }

    await transporter.sendMail({
      from: `"${manager}" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email || process.env.GMAIL_USER,
      subject: `طلب وكالة جديدة - ${company}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c4a94e; border-bottom: 2px solid #c4a94e; padding-bottom: 10px;">طلب وكالة جديدة - دار المال</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #555; width: 35%;">اسم الشركة / المؤسسة:</td>
              <td style="padding: 10px; color: #333;">${company}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; color: #555;">اسم المسؤول:</td>
              <td style="padding: 10px; color: #333;">${manager}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #555;">البريد الإلكتروني:</td>
              <td style="padding: 10px; color: #333;">${email || 'لم يُذكر'}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; color: #555;">رقم الهاتف:</td>
              <td style="padding: 10px; color: #333;" dir="ltr">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #555;">العنوان / المنطقة:</td>
              <td style="padding: 10px; color: #333;">${address || 'لم يُذكر'}</td>
            </tr>
            ${notes ? `
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; color: #555; vertical-align: top;">ملاحظات:</td>
              <td style="padding: 10px; color: #333; white-space: pre-wrap;">${notes}</td>
            </tr>` : ''}
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Agent request email error:', error);
    return NextResponse.json({ error: 'فشل إرسال الطلب' }, { status: 500 });
  }
}
