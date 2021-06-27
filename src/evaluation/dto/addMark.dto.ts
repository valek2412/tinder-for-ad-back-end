import { Ad } from '../../ads/ads.model';

export class AddMarkDto {
  readonly userId: number;
  readonly adId: number;
  readonly mark: keyof Ad;
}
