import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeUsageService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
  }

  async reportMeterEvent(params: {
    customerId: string;
    quantity: string;
  }) {
    const { customerId,  quantity } = params;

    return await this.stripe.billing.meterEvents.create({
      event_name: 'api_requests',
      payload: {
        value: quantity,
        stripe_customer_id: customerId,
      },
    });
  }
}
