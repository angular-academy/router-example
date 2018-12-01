# RouterExample

## Link Sammlung

* [angular routing & navigation](https://angular.io/guide/router)
* [Router class](https://angular.io/api/router/Router)
* [ActivatedRoute class](https://angular.io/api/router/ActivatedRoute)
* [routerLink directive](https://angular.io/api/router/RouterLink)
* [Route interface](https://angular.io/api/router/Route)
* [CanActivate guard](https://angular.io/api/router/CanActivate)

## Themen

* Basics: Setup - Routen anlegen - Routen ansteuern
* Lazy Loading
* Guards
* Router Events
* Named Outlets (Popup)
* Tipps

## Motivation

Der angular router erlaubt es uns, die aktuelle View einer Anwendung auf Basis der Url zu ändern. Komplexe Anwendungen bestehen aus vielschichtigen Views, und der Router ist unser Werkzeug dieses Gesamtbild aus mehreren Einzelkomponenten zu erstellen, und Komponenten passend zur Url ein- und auszublenden.

Die Anleitung zum Router findet ihr hier: [angular router](https://angular.io/guide/router)

## Teil 1 - Basics

Beim Erstellen eines Projektes fragt uns die CLI, ob wir routing verwenden wollen. Dies bestätigen wir und erhalten eine weitere Datei zum App-Module: *app-routing.module.ts*

Ansonsten kann jedes Modul mit einer Routing Tabelle erzeugt werden, indem der Parameter *--routing* hinuzgefügt wird:

```bash
ng generate module todo-list --routing
```

In diesem Modul können wir die Routing Tabelle für das Modul definieren.

Neben der Routing Tabelle müssen wir angular noch sagen, WO Komponenten aus der Routing-Tabelle eingeblendet werden. Dieser Einhägepunkt ist das [router-outlet](https://angular.io/api/router/RouterOutlet)
```html
<router-outlet></router-outlet>
```

### Komponenten beim Router registrieren

Füllen wir die auf Routing vorbereitete App mit etwas Inhalt. Wir erzeugen hierzu zwei Komponenten

```bash
ng generate component start
ng generate component item-list
```

Um diese Komponenten im router-outlet anzuzeigen, füllen wir die Routing Tabelle wie folgt:

```typescript
const routes: Routes = [
  {
    path: 'start',
    component: StartComponent
  },
  {
    path: 'item-list',
    component: ItemListComponent,
    children: [
      {
        path: 'details/:id',
        component: ItemDetailsComponent
      }
    ]
  }
];
```

Starten wir die Anwendung (ng serve), können wir unter localhost:4200/start bzw. localhost:4200/item-list die Komponenten sehen.

### Default-Routing und Not Found

Nehmen wir an, dass StartComponent unser Einstiegspunkt sein soll. Rufen wir unsere Anwendung nun von localhost:4200 auf, sehen wir dass StartComponent nicht aktiviert wird.

Wir müssen die Routing-Tabelle somit um eine *default* Route erweitern:

```typescript
{
    path: '',
    redirectTo: '/start',
    pathMatch: 'full'
}
```

mittels *redirectTo* definieren wir eine Umleitung, das *pathMatch* sagt dass die aktuelle Browser-Url vollständig auf *path* matchen muss.

Jetzt können wir in unsere Anwendung unter */*, */start* und */item-list* Inhalte abrufen. Was aber wenn aus der Url keine Ansicht ableitbar ist, weil keine Komponente(n) matchen können?

Hierzu erlaubt angular, per Wildcard auf eine dedizierte Nicht-gefunden Seite umzuleiten. Hierzu erstellen wir eine Komponente:

```bash
ng generate component not-fount
```

und erweitern unsere Routing-Tabelle:

```typescript:
{
    path: '**',
    component: NotFoundComponent
}
```

### Navigation und Verlinkungen

Wir haben in unserer App nun ein Grundgerüst, und können alle (für uns) relevanten Urls auf Komponenten mappen. Wie aber können wir Navigation umsetzen? Hierzu bietet angular zwei Möglichkeiten:
* Navigation über [routerLink](https://angular.io/api/router/RouterLink) Direktive
* Programmatisch über [router.navigate](https://angular.io/api/router/Router#navigate)

Befassen wir uns zunachst mit der Direktive. Wir erweitern das HTML-Template unserer App-Komponente:

```html
<nav>
    <a [routerLink]="'/start'">Start</a>
    <a [routerLink]="'/item-list'">Item List</a>
</nav>
```

Hiermit haben wir eine grundlegende Navigationsleiste. Die Router-Link Direktive wandelt Pfad-Fragmente in einer Url um. Bei einem Klick ändert der Browser die Url, und angular erstellt im Router-Outlet die passende Komponente.

Neben der routerLink Direktive können wir Navigationen auch direkt über den Router ausführen. Hierzu injecten wir den Router per dependency-injection in unsere App-Component:

```typescript
constructor(private router: Router) {
}
```

Ein Button oder Div, das per *click*-Eventhandler nun programmatisch eine Navigation aufruft, kann wie folgt implementiert werden:

```typescript
gotoStart() {
    this.router.navigate(['start']);
}
```

## Teil 2 - Guards

Anwendungen können Bereiche enthalten, die nur unter bestimmten Bedingungen (authorisierung, etc) zugreifbar sind.

Durch das Verstecken von Links kann man zur Laufzeit die Navigation soweit einschränken, dass unauthorisierte Links nicht sichtbar sind. Das schützt aber nicht vor einer Aktivierung mittels Deeplinking.

Hierzu bietet angular *guards*. Eine Guard ist ein Service (mit @Injectable dekoriert), der eines der folgenden Interfaces implementiert:
* [canActivate](https://angular.io/api/router/CanActivate)
* [canDeactivate](https://angular.io/api/router/CanLoad)
* [canActivateChild](https://angular.io/api/router/CanActivateChild)

Im Beispiel erstellen wir zunächst einen Bereich, der geschützt sein soll

```bash
ng generate component protected-content
```

sowie ein Enum mit verschiedenen Benutzer-Rollen:

```typescript
export enum UserRoles {
    VISITOR = 'Visitor',
    USER = 'User',
    ADMIN = 'Admin'
}
```

Um den Zugriff auf diese Komponente zu kontrollieren erstellen wir eine *Guard* . Dies sind Services, die von angular im Zuge einer Navigation von angular aufgerufen werden.

Als Beispiel wollen wir Benutzer-Rollen prüfen, hierzu erzeugen wir eine Guard:

```bash
mkdir src/app/guard
cd srd/app/guard
ng generate guard check-user
```

Wir gehen später auf die Implementierung ein und schauen uns an, wie wir die Guard verwenden:

Ein *User-Service* stellt die aktuelle Rolle bereit. Wollen wir eine Route schützen, müssen wir die Guard an die Route hängen. Erwartet die Guard weitere Daten, können wir diese im *data* Feld übergeben:

```typescript

const routes: Routes = [
  // ...
  {
    path: 'protected-content',
    component: ProtectedContentComponent,
    canActivate: [CheckUserGuard],
    data: {
      roles: [UserRoles.ADMIN]
    }
  },
  // ...
```

Die Guard ist dann wie folgt implementiert:

```typescript

@Injectable({
  providedIn: 'root'
})
export class CheckUserGuard implements CanActivate {

  constructor( private userService: UserService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log('check user guard called', next.data );

      if (next.data.roles && next.data.roles.indexOf( this.userService.role ) !== -1 ) {
        return true;
      } else {
        return false;
      }
  }
}
```

## Teil 3 - Router Events

Der Router ermöglicht es, aktuelle Vorgänge über [Events](https://angular.io/api/router/Event) auszulesen. Hierzu injected ihr den Router als Abhängigkeit und subscribed euch auf die *events* (siehe app-component):


```typescript
constructor(private router: Router) {
```

```typescript
ngOnInit() {
  this.routerEventsSubscription = this.router.events.subscribe(
    routerEvent => console.log(routerEvent)
  );
}
```

Mittels Router Events könnt ihr zum Beispiel folgende Funktion in eure Anwendungen einbauen:
* Anzeigen eines Loading-Spinners beim Laden weiterer Chunks (siehe auch Lazy Loading)
* Url-Wechseln einem Tracker / Analytics Service mitteilen

## Teil 4 - Lazy Loading

Bisher haben wir in Routen-Definitionen direkt Komponenten angegeben. Es ist aber auch möglich, bestehende Module (mit eigener Routing-Tabelle) als *Kind-Elemente* zu einer Route hinzuzufügen, die dynamisch nachgeladen werden.

Hierzu erzeugen wir uns ein neues Modul mit einer Komponente:

```bash
ng generate module lazy --routing
ng generate component lazy
```

und registrieren die Komponente im lazy-Routing-Modul:

```typescript
const routes: Routes = [
  {
    path: '',
    component: LazyComponent
  }
];
```

Im app-Routing-Modul registrieren wir jetzt eine neue Route *lazy* wie folgt:

```typescript
{
    path: 'lazy',
    loadChildren: './lazy/lazy.module#LazyModule'
},
```

mittels loadChildren referenzieren wir das Lazy-Module nicht direkt (kein Import im App-Module), sondern geben der CLI die Change, Lazy als eigenes Javascript-Bundle zu kompilieren und erst bei Bedarf (NavigationStart) zu laden.

Die Syntax ist wie folgt:
* vor # steht der Pfad zum lazy-loaded Modul (ohne .ts), relativ zum aktuellen Modul
* hinter # steht der Klassenname des lazy-loaded Module

## Teil 5 - Named Outlets

Über den Router aktivierte Komponenten werden über das[\<outlet\>\</outlet\>](https://angular.io/guide/router#router-outlet) Tag eingehangen (im DOM geschieht dies als direkter Nachbar des outlets).

Angular unterstützt mehrere outlets, die über einen Names identifiziert werden und über das Routing individuell ansteuerbar sind:

```html
<router-outlet></router-outlet>
<router-outlet name="popup"></router-outlet>
```

Der Link besteht nun aus einem Wörterbuch, welches auf *outlets* und dann auf die *Namen* der einzelnen Outlets verweist.

```html
<a [routerLink]="[{outlets: {popup: ['popup','start']}}]">Popup Start</a>
```
TIP: Das Default-Outlet heißt *primary*. Es wird immer dann benutzt, wenn kein Outlet explizit genannt wird.


Um einem benannten Outlet eine Komponente mitsamt Routing-Tabelle zuzuweisen, setzt ihr das Feld *outlet* in der [Route](https://angular.io/api/router/Route) Definition der Komponente (im Beispiel popup-component):

```typescript
const routes: Routes = [
  {
    path: 'popup',
    component: PopupComponent,
    outlet: 'popup',
    children: [
      {
        path: 'start',
        component: StartComponent
      },
      ...
```

Wird ein outlet aktiviert, bleibt es aktiv bis es explizit geschlossen wird. Dies geschieht durch Zuweisen von *null* .

```typescript
closePopup() {
  this.router.navigate([{outlets : {popup: null}}]);
}
```

## Tipps

* [Router.navigate](https://angular.io/api/router/Router#navigate) gibt ein Promise zurück. Ihr könnt daran erkennen, ob eine Navigation erfolgreich war oder nicht. Ebenso könnt ihr Navigationen verketten (Beispiel: zuerst outlets schließen, dann zur not-found / not-authorized Seite navigieren)

* Über *activate* und *deactivate* Events der [\<router-outlet\>](https://angular.io/api/router/RouterOutlet) Direktive könnt ihr in Komponenten programmatisch erfassen, welche Kinder gerade instanziiert bzw. von der Bühne genommen werden.
