// @Component({
//     selector: "encapsulation-example",
//     templateUrl: "./encapsulation-example.component.html",
//     styleUrls: ['./encapsulation-example.css'], //при добавлении этой строки возникают атрибуты типо _ngcontent-qbq-8
//     encapsulation: ViewEncapsulation.None //Native - делает shadow dom, Emulated, None
// })
//Директива не имеет своего шаблона, поэтому делает что-то с элементом к которому ее применяем
//Директивы из коробки:
//Структурные директивы изменяют структуру DOM с помощью добавления или удаления html-элементов. Существуют три структурных директивы: ngIf, ngSwitch и ngFor.
// [ngClass]
// *ngFor
// *ngIf
//2 структурные директивы не могут быть на 1 элементе 
