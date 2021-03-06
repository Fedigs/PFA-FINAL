import { Component, OnInit } from "@angular/core";
import { User } from "src/app/class/user";
import { UserService } from "src/app/services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { TokenStorageService } from "../../services/token-storage.service";
import { Medecin } from "src/app/class/medecin";
import { MedecinService } from "src/app/services/medecin.service";
import { Patient } from "src/app/class/patient";
import { PatientService } from "src/app/services/patient.service";
import { AgmCoreModule } from "@agm/core";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  id: number;
  medecin: Medecin;
  patient: Patient;
  user: User;
  currentUser: any;
  roles: string[];
  tabVille = {
    Tunis: { lat: 36.77, lng: 10.28 },
    BenArous: { lat: 36.74886, lng: 10.224601 },
    Bizerte: { lat: 37.272091, lng: 9.870857 },
    Beja: { lat: 36.73, lng: 9.19 },
    zahra: { lat: 36.74339817233152, lng: 10.304460384472662 },
    rades: { lat: 36.774402, lng: 10.276969 },
    zaghouan: { lat: 36.4117196, lng: 10.2019798 },
    kef: { lat: 36.15364, lng: 8.6082924 },
    Sfax: { lat: 34.62814, lng: 10.758707 },
    Sousse: { lat: 35.828829, lng: 10.640525 },
    Monastir: { lat: 35.739872, lng: 10.79884 },
    Ariana: { lat: 36.968574, lng: 10.121986 },
    Manouba: { lat: 36.811597, lng: 10.085763 },
    Kairouan: { lat: 35.6710101, lng: 10.10062 },
    Jendouba: { lat: 36.5, lng: 8.77 },
    Gafsa: { lat: 34.43367, lng: 8.7907988 },
    Gabes: { lat: 33.9, lng: 10.1 },
    Siliana: { lat: 36.09, lng: 9.36 },
    Kebili: { lat: 33.7061148, lng: 8.9698376 },
    Tataouine: { lat: 32.93, lng: 10.45 },
    Djerba: { lat: 33.7733906, lng: 10.8859041 },
    SidiBouzid: { lat: 35.04, lng: 9.5 },
    Nabeul: { lat: 36.46, lng: 10.73 },
    Mahdia: { lat: 35.52, lng: 11.07 },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: UserService,
    private medecinService: MedecinService,
    private patientService: PatientService,
    private token: TokenStorageService
  ) {}

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.roles = this.token.getUser().roles;
    this.user = new User();

    if (this.token.getUser().roles[0] == ["ROLE_MEDECIN"]) {
      this.medecin = new Medecin();
      this.id = this.route.snapshot.params["id"];

      this.medecinService.getMedecin(this.id).subscribe(
        (data) => {
          console.log(data);
          this.medecin = data;
        },
        (error) => console.log(error)
      );
    } else {
      this.patient = new Patient();
      this.id = this.route.snapshot.params["id"];

      this.patientService.getPatient(this.id).subscribe(
        (data) => {
          console.log(data);
          this.patient = data;
        },
        (error) => console.log(error)
      );
    }
  }

  deleteMedecin(id: number) {
    var res = confirm(
      "Êtes-vous sûr de vouloir désactiver votre compte MEDECIN ?"
    );
    if (res) {
      this.medecinService.deleteMedecin(id).subscribe(
        (data) => {
          console.log(data);
          //this.reloadData();
          this.logout();
        },
        (error) => console.log(error)
      );
    }
  }

  deletePatient(id: number) {
    var res = confirm(
      "Êtes-vous sûr de vouloir désactiver votre compte PATIENT ?"
    );
    if (res) {
      this.patientService.deletePatient(id).subscribe(
        (data) => {
          console.log(data);
          //this.reloadData();
          this.logout();
        },
        (error) => console.log(error)
      );
    }
  }

  reloadData() {
    this.router.navigate(["register"]);
  }

  updateMedecin(id: number) {
    this.router.navigate(["user-update", id]);
  }

  updatePatient(id: number) {
    this.router.navigate(["user-update", id]);
  }

  logout() {
    var res = confirm("Nous nous excusons pour la gêne occasionnée");
    if (res) {
      this.token.signOut();

      this.router.navigate(["register"]);
    }
    // window.location.reload();
  }
}
