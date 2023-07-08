import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-profil-edit',
  templateUrl: './profil-edit.component.html',
  styleUrls: ['./profil-edit.component.css'],
})
export class ProfilEditComponent {
  obj: User | null = null;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    let id = this.route.snapshot.params['id'];
    if (this.obj != null) {
      this.obj = this.userService.getById(id);
    }

    console.log(this.obj);

    this.form = new FormGroup({
      name: new FormControl(this.obj?.name),
      email: new FormControl(this.obj?.email),
      birthDate: new FormControl(this.obj?.birthDate),
      city: new FormControl(this.obj?.city),
      country: new FormControl(this.obj?.country),
    });
  }

  onCancel() {
    this.router.navigate(['/profile']);
  }

  onSubmit() {
    if (this.obj) {
      this.obj.name = this.form.controls['name'].value;
      this.obj.email = this.form.controls['email'].value;
      this.obj.birthDate = this.form.controls['birthDate'].value;
      this.obj.city = this.form.controls['city'].value;
      this.obj.country = this.form.controls['country'].value;

      this.userService.save(this.obj);
      this.router.navigate(['/profile']);
    }
    console.log('cancelled');
  }
}
