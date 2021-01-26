import { Component, OnInit } from '@angular/core';
import { HostFamily } from '../../models/hostFamily.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HostFamiliesService } from '../../services/host-family.service';
import firebase  from 'firebase';


@Component({
  selector: 'app-host-family-info',
  templateUrl: './host-family-info.component.html',
  styleUrls: ['./host-family-info.component.scss']
})
export class HostFamilyInfoComponent implements OnInit {
  hostFamily: HostFamily ;
  isUpdateHostFamily = false;
  checkHostFamily = true;
  isAuth: boolean;
  constructor(
    private route: ActivatedRoute,
    private hostFamiliesService:  HostFamiliesService,
    private router: Router) 
    { }


  ngOnInit() {
    this.hostFamily = new HostFamily ('', '', '', '' , '');
    const id = this.route.snapshot.params['id'];
    this.hostFamiliesService.getSingleHostFamily(+id).then(
      (hostFamily: HostFamily  ) => {
        if (hostFamily === null) {
          this.checkHostFamily = false;
        } else {
          this.hostFamily = hostFamily;
        }
      }
    );
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
  onBack() {
    this.router.navigate(['/host-families']);
  }

  onUpdateHostFamily () {
    this.isUpdateHostFamily  = true;
  }


  onDeleteHostFamily () {
    this.hostFamiliesService.removeHostFamily (this.hostFamily);
    this.onBack();
  }

}