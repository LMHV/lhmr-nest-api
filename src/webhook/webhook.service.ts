import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserJSON, WebhookEvent } from "@clerk/clerk-sdk-node"
import { Webhook, WebhookRequiredHeaders } from 'svix';
import { IncomingHttpHeaders } from 'http';

@Injectable()
export class WebhookService {
  constructor (private prisma: PrismaService) {}

  async handleWebhook(payloadString: any, svixHeaders: any): Promise<any> {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY!);
    const evt = wh.verify(payloadString, svixHeaders as IncomingHttpHeaders & WebhookRequiredHeaders) as WebhookEvent;
    const { id, ...attributes} = evt.data;

    const eventType = evt.type;
    if (eventType === 'user.created') {
      const { username, email_addresses } = attributes as UserJSON;
      Logger.log('testing?', username)
      try {
        await this.prisma.user.create({
          data: {
            externalId: id!,
            username: 'hola',
            email: email_addresses[0].email_address,
            subscriptionStatus: 'No Abonado',
            subscriptionPlan: 'Sin plan'
          }
        })
      } catch (error: any) {
        console.error(error.message)
      }
    }

    return {
      success: true,
      message: `Webhook received, event type: ${evt.type}`
    }
  }
}
