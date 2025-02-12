import { Inject, Injectable } from "@angular/core";

import { WINDOW } from "@bitwarden/angular/services/injection-tokens";
import { AbstractThemingService } from "@bitwarden/angular/services/theming/theming.service.abstraction";
import { CryptoService as CryptoServiceAbstraction } from "@bitwarden/common/abstractions/crypto.service";
import { EncryptService } from "@bitwarden/common/abstractions/encrypt.service";
import {
  EnvironmentService as EnvironmentServiceAbstraction,
  Urls,
} from "@bitwarden/common/abstractions/environment.service";
import { EventUploadService as EventUploadServiceAbstraction } from "@bitwarden/common/abstractions/event/event-upload.service";
import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { NotificationsService as NotificationsServiceAbstraction } from "@bitwarden/common/abstractions/notifications.service";
import { StateService as StateServiceAbstraction } from "@bitwarden/common/abstractions/state.service";
import { TwoFactorService as TwoFactorServiceAbstraction } from "@bitwarden/common/abstractions/twoFactor.service";
import { VaultTimeoutService as VaultTimeoutServiceAbstraction } from "@bitwarden/common/abstractions/vaultTimeout/vaultTimeout.service";
import { ContainerService } from "@bitwarden/common/services/container.service";
import { EventUploadService } from "@bitwarden/common/services/event/event-upload.service";
import { VaultTimeoutService as VaultTimeoutService } from "@bitwarden/common/services/vaultTimeout/vaultTimeout.service";

import { WebI18nServiceImplementation } from "./web-i18n.service.implementation";

@Injectable()
export class InitService {
  constructor(
    @Inject(WINDOW) private win: Window,
    private environmentService: EnvironmentServiceAbstraction,
    private notificationsService: NotificationsServiceAbstraction,
    private vaultTimeoutService: VaultTimeoutServiceAbstraction,
    private i18nService: I18nService,
    private eventUploadService: EventUploadServiceAbstraction,
    private twoFactorService: TwoFactorServiceAbstraction,
    private stateService: StateServiceAbstraction,
    private cryptoService: CryptoServiceAbstraction,
    private themingService: AbstractThemingService,
    private encryptService: EncryptService
  ) {}

  init() {
    return async () => {
      await this.stateService.init();

      const urls = process.env.URLS as Urls;
      urls.base ??= this.win.location.origin;
      this.environmentService.setUrls(urls);

      setTimeout(() => this.notificationsService.init(), 3000);
      (this.vaultTimeoutService as VaultTimeoutService).init(true);
      const locale = await this.stateService.getLocale();
      await (this.i18nService as WebI18nServiceImplementation).init(locale);
      (this.eventUploadService as EventUploadService).init(true);
      this.twoFactorService.init();
      const htmlEl = this.win.document.documentElement;
      htmlEl.classList.add("locale_" + this.i18nService.translationLocale);
      await this.themingService.monitorThemeChanges();
      const containerService = new ContainerService(this.cryptoService, this.encryptService);
      containerService.attachToGlobal(this.win);
    };
  }
}
