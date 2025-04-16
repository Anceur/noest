import { Component, AfterViewInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coverage',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './coverage.component.html',
  styleUrl: './coverage.component.css'
})
export class CoverageComponent implements AfterViewInit {
  selectedWilaya: string | null = null;
  showInfo: boolean = false;
  infoPosition = { x: 0, y: 0 };

  @ViewChild('svgObject', { static: false }) svgObjectRef!: ElementRef;

  constructor(private zone: NgZone) {}
  wilayaNames: { [key: string]: string } = {
    "DZ01": "Adrar",
    "DZ02": "Chlef",
    "DZ03": "Laghouat",
    "DZ04": "Oum El Bouaghi",
    "DZ05": "Batna",
    "DZ06": "Bejaia",
    "DZ07": "Biskra",
    "DZ08": "Bechar",
    "DZ09": "Blida",
    "DZ10": "Bouira",
    "DZ11": "Tamanrasset",
    "DZ12": "Tebessa",
    "DZ13": "Tlemcen",
    "DZ14": "Tiaret",
    "DZ15": "Tizi Ouzou",
    "DZ16": "Alger",
    "DZ17": "Djelfa",
    "DZ18": "Jijel",
    "DZ19": "Setif",
    "DZ20": "Saida",
    "DZ21": "Skikda",
    "DZ22": "Sidi Bel Abbes",
    "DZ23": "Annaba",
    "DZ24": "Guelma",
    "DZ25": "Constantine",
    "DZ26": "Medea",
    "DZ27": "Mostaganem",
    "DZ28": "M'Sila",
    "DZ29": "Mascara",
    "DZ30": "Ouargla",
    "DZ31": "Oran",
    "DZ32": "El Bayadh",
    "DZ33": "Illizi",
    "DZ34": "Bordj Bou Arrer",
    "DZ35": "Boumerdes",
    "DZ36": "El-Tarf",
    "DZ37": "Tindouf",
    "DZ38": "Tissemsilt",
    "DZ39": "El Oued",
    "DZ40": "Khenchela",
    "DZ41": "Souk-Ahras",
    "DZ42": "Tipaza",
    "DZ43": "Mila",
    "DZ44": "Ain-Defla",
    "DZ45": "Naama",
    "DZ46": "Ain-Temouchent",
    "DZ47": "Ghardaia",
    "DZ48": "Relizane",
    "DZ49": "El M'Ghair",
    "DZ50": "El Menia",
    "DZ51": "Ouled Djellal",
    "DZ52": "Bordj Baji Mokhtar",
    "DZ53": "Béni Abbès",
    "DZ54": "Timimoun",
    "DZ55": "Touggourt",
    "DZ56": "Djanet",
    "DZ57": "In Salah",
    "DZ58": "In Guezzam"
  };

  selectedPath: Element | null = null;

  ngAfterViewInit(): void {
    const svgObject = this.svgObjectRef.nativeElement as HTMLObjectElement;

    svgObject.addEventListener('load', () => {
      const svgDoc = svgObject.contentDocument;
      if (!svgDoc) {
        console.error('SVG document not loaded');
        return;
      }

      const paths = svgDoc.querySelectorAll('path[id^="DZ"]');
      paths.forEach((path: Element) => {
        (path as HTMLElement).style.cursor = 'pointer';

        // Set default color
        (path as SVGPathElement).setAttribute('fill', '#b0181b');

        // Mouse enter event
        path.addEventListener('mouseenter', (event) => {
          const wilayaId = path.id;
          const wilayaName = this.wilayaNames[wilayaId] || 'Wilaya inconnue';
          
          this.zone.run(() => {
            this.selectedWilaya = wilayaName;
            this.showInfo = true;
            
            // Position the info box near the cursor
            const rect = (event.target as SVGGraphicsElement).getBoundingClientRect();
            this.infoPosition = {
              x: rect.left + window.scrollX,
              y: rect.top + window.scrollY - 150
            };

            // Highlight the path
            (path as SVGPathElement).setAttribute('fill', '#8a1313');
          });
        });

        // Mouse leave event
        path.addEventListener('mouseleave', () => {
          this.zone.run(() => {
            this.showInfo = false;
            (path as SVGPathElement).setAttribute('fill', '#b0181b');
          });
        });

        // Click event
        path.addEventListener('click', () => {
          const wilayaId = path.id;
          const wilayaName = this.wilayaNames[wilayaId] || 'Wilaya inconnue';

          this.zone.run(() => {
            this.selectedWilaya = wilayaName;
            this.showInfo = true;
          });
        });
      });
    });
  }
}
