import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import { Webhook, WebhookRequiredHeaders } from 'svix';
import { WebhookEvent } from '@clerk/clerk-sdk-node';
import { RawBodyRequest } from '@nestjs/common/interfaces';
import { UserService } from 'src/user/user.service';

@Controller('/api/webhook')
export class WebhookController {
  constructor (private readonly userService: UserService) {}

@Post()
async handleWebhook(@Req() req: RawBodyRequest<Request>, @Res() res: Response) {
  try {
    const payloadString = req.rawBody!.toString()
    const svixHeaders =  req.headers;
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY!)
    const evt = wh.verify(payloadString, svixHeaders as IncomingHttpHeaders & WebhookRequiredHeaders) as WebhookEvent;
    

    const eventType = evt.type;
    if (eventType === 'user.created') {
      await this.userService.create(evt.data)
    }
    
    
  } catch (error: any) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
}
}


