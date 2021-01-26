import { Component, OnInit, OnDestroy } from '@angular/core';
import { HostFamily  } from '../models/hostFamily.model';
import { Subscription } from 'rxjs/Subscription';
import { HostFamiliesService } from '../services/host-family.service';
import { ActivatedRoute, Router } from '@angular/router';
import firebase  from 'firebase';

@Component({
  selector: 'app-host-family',
  templateUrl: './host-family.component.html',
  styleUrls: ['./host-family.component.scss']
})
export class HostFamilyComponent implements OnInit, OnDestroy  {

  hostFamilies: HostFamily[];
  hostFamiliesSubscription: Subscription;
  isAuth: boolean;

  constructor(
    private route: ActivatedRoute,
    private hostFamiliesService: HostFamiliesService,
    private router: Router,
    
    ) {}

  ngOnInit() {
    this.hostFamiliesSubscription = this.hostFamiliesService.hostFamiliesSubject.subscribe(
      (hostFamilies: HostFamily[]) => {
        this.hostFamilies = hostFamilies;
      }
    );
    this.hostFamiliesService.getHostFamilies();
    this.hostFamiliesService.emitHostFamilies();

    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );

  }


  onNewHostFamily() {
    this.router.navigate(['/host-families', 'new']);
  }

  onDeleteHostFamily(hostFamily : HostFamily) {
    this.hostFamiliesService.removeHostFamily(hostFamily);
  }

  onViewHostFamily(id: number) {
    this.router.navigate(['/host-families', 'view', id]);
  }

  ngOnDestroy() {
    this.hostFamiliesSubscription.unsubscribe();
  }

}
