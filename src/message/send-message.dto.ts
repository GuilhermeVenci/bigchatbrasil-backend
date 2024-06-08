export class SendMessageDto {
  id: number;
  phoneNumber: string;
  isWhatsApp: boolean;
  text: string;
  clientId: number;
  sentAt: Date;
}
