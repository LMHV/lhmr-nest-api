import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { WebhookService } from './webhook.service';
import { IncomingHttpHeaders } from 'http';
import { Webhook, WebhookRequiredHeaders } from 'svix';
import { WebhookEvent } from '@clerk/clerk-sdk-node';

@Controller('/api/webhook')
export class WebhookController {
  constructor (private readonly webhookService: WebhookService) {}

@Post()
async handleWebhook(@Req() req: Request, @Res() res: Response) {
  try {
    const payloadString = req.body.toString()
    const svixHeaders =  req.headers;
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY!)
    // Logger.log('payloadString', payloadString)
    // console.log('paylaodString', payloadString)
    // Logger.log('svixheaders', svixHeaders)
    console.log('llega1')
    const evt = wh.verify(payloadString, svixHeaders as IncomingHttpHeaders & WebhookRequiredHeaders) as WebhookEvent;
    console.log(evt)
    // console.log(req.body)
    // await this.webhookService.handleWebhook(payloadString, svixHeaders);

    
    
  } catch (error: any) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
}
}


