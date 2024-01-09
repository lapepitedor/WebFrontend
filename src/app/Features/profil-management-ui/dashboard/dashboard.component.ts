import { Component, OnInit } from '@angular/core';
import { Profil } from 'src/app/Features/model/Profil';
import { AuthentificationService } from 'src/app/shared/authentification.service';
import { UserRole } from '../../model/UserRole';
import { ProfilService } from 'src/app/shared/profil.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  profil: Profil = null;
  profileCount: number = 0;
  femaleCount: number = 0;
  maleCount: number = 0;

  constructor(
    public authService: AuthentificationService,
    private service: ProfilService,private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {

     this.getProfilDetail();

    this.service.getProfileCount().subscribe((count) => {
      this.profileCount = count;
    });

     this.service.getFemaleProfileCount().subscribe(count => {
       this.femaleCount = count;
       console.log(count)
    });
    this.service.getMaleProfileCount().subscribe(count => {
      this.maleCount = count;
    });

   
  }
  
  getProfilDetail() {
     this.afAuth.authState.subscribe(user => {
      if (user) {
        const userId = user.uid;
        this.service.getProfilDetail(userId).subscribe(profile => {
          this.profil = profile;
          console.log(profile);
        });
      }
    });
  }
   
}
