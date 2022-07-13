import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { OrganizationService } from "@bitwarden/common/abstractions/organization.service";
import { Organization } from "@bitwarden/common/models/domain/organization";

@Component({
  selector: "app-org-reporting",
  templateUrl: "reporting.component.html",
})
export class ReportingComponent implements OnInit {
  organization: Organization;
  accessEvents = false;
  showLeftNav = true;

  constructor(private route: ActivatedRoute, private organizationService: OrganizationService) {}

  ngOnInit() {
    this.route.parent.params.subscribe(async (params) => {
      this.organization = await this.organizationService.get(params.organizationId);
      this.accessEvents = this.showLeftNav = this.organization.useEvents;
    });
  }
}
