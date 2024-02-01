import { Controller, Post, Req, Res } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('/api/webhook')
export class WebhookController {
  constructor (private readonly webhookService: WebhookService) {}

@Post()
async handleWebhook(@Req() req: Request, @Res() res: Response) {
  try {
    const payloadString = req.body!.toString();
    const svixHeaders =  req.headers
  } catch (error) {
    
  }
}
}


