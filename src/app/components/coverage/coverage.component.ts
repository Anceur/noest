// coverage.component.ts
import { Component, AfterViewInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coverage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coverage.component.html',
  styleUrl: './coverage.component.css'
})
export class CoverageComponent implements AfterViewInit {
  selectedWilaya: { name: string; hours: string } | null = null;
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
    "DZ16": "Algiers",
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
    "DZ34": "Bordj Bou Arreridj",
    "DZ35": "Boumerdes",
    "DZ36": "El Tarf",
    "DZ37": "Tindouf",
    "DZ38": "Tissemsilt",
    "DZ39": "El Oued",
    "DZ40": "Khenchela",
    "DZ41": "Souk Ahras",
    "DZ42": "Tipaza",
    "DZ43": "Mila",
    "DZ44": "Ain Defla",
    "DZ45": "Naama",
    "DZ46": "Ain Temouchent",
    "DZ47": "Ghardaia",
    "DZ48": "Relizane",
    "DZ49": "El M'Ghair",
    "DZ50": "El Menia",
    "DZ51": "Ouled Djellal",
    "DZ52": "Bordj Badji Mokhtar",
    "DZ53": "Beni Abbes",
    "DZ54": "Timimoun",
    "DZ55": "Touggourt",
    "DZ56": "Djanet",
    "DZ57": "In Salah",
    "DZ58": "In Guezzam"
  };

  // Default working hours for all wilayas
  defaultHours = "Working Hours: 08:00 AM - 05:00 PM";

  ngAfterViewInit(): void {
    // Wait for SVG to fully load
    setTimeout(() => {
      this.setupSvgInteractions();
    }, 1000); // Increased timeout for better compatibility
  }

  setupSvgInteractions() {
    const svgObject = this.svgObjectRef.nativeElement as HTMLObjectElement;
    
    if (svgObject.contentDocument && svgObject.contentDocument.readyState === 'complete') {
      this.initializeSvgInteractions(svgObject.contentDocument);
    } else {
      svgObject.onload = () => {
        this.initializeSvgInteractions(svgObject.contentDocument);
      };
    }
  }

  initializeSvgInteractions(svgDoc: Document | null) {
    if (!svgDoc) {
      console.error('SVG document not loaded');
      return;
    }

    // Get SVG element and adjust its viewBox if needed
    const svgElement = svgDoc.querySelector('svg');
    if (svgElement && !svgElement.getAttribute('viewBox') && 
        svgElement.getAttribute('width') && svgElement.getAttribute('height')) {
      const width = parseFloat(svgElement.getAttribute('width') || '0');
      const height = parseFloat(svgElement.getAttribute('height') || '0');
      svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
      svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    }

    const paths = svgDoc.querySelectorAll('path[id^="DZ"]');
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    paths.forEach((path: Element) => {
      // Set initial styles
      (path as HTMLElement).style.cursor = 'pointer';
      (path as SVGPathElement).setAttribute('fill', '#b0181b');
      (path as SVGPathElement).setAttribute('stroke', '#ffffff');
      (path as SVGPathElement).setAttribute('stroke-width', '1');
      (path as SVGPathElement).style.transition = 'fill 0.3s ease';

      // Click event (works on all devices)
      path.addEventListener('click', (event) => {
        const wilayaId = path.id;
        const wilayaName = this.wilayaNames[wilayaId] || 'Unknown Wilaya';
        
        this.zone.run(() => {
          // If clicking the same wilaya, deselect it
          if (this.selectedWilaya?.name === wilayaName) {
            this.selectedWilaya = null;
            this.showInfo = false;
            (path as SVGPathElement).setAttribute('fill', '#b0181b');
            return;
          }

          // Reset all paths to default color
          paths.forEach((p: Element) => {
            (p as SVGPathElement).setAttribute('fill', '#b0181b');
          });

          this.selectedWilaya = {
            name: wilayaName,
            hours: this.defaultHours
          };
          this.showInfo = true;
          
          this.updateTooltipPosition(event, path);
          (path as SVGPathElement).setAttribute('fill', '#8a1313');
        });
      });

      // Hover events (only for non-mobile devices)
      if (!isMobile) {
        path.addEventListener('mouseenter', (event) => {
          const wilayaId = path.id;
          const wilayaName = this.wilayaNames[wilayaId] || 'Unknown Wilaya';
          
          this.zone.run(() => {
            this.selectedWilaya = {
              name: wilayaName,
              hours: this.defaultHours
            };
            this.showInfo = true;
            
            this.updateTooltipPosition(event, path);
            (path as SVGPathElement).setAttribute('fill', '#8a1313');
          });
        });

        path.addEventListener('mouseleave', () => {
          this.zone.run(() => {
            this.showInfo = false;
            (path as SVGPathElement).setAttribute('fill', '#b0181b');
          });
        });
      }
    });
  }

  private updateTooltipPosition(event: Event, path: Element) {
    const mouseEvent = event as MouseEvent;
    const svgRect = this.svgObjectRef.nativeElement.getBoundingClientRect();
    const pathRect = (event.target as SVGGraphicsElement).getBoundingClientRect();
    
    // Calculate center of the path
    const centerX = pathRect.left + pathRect.width / 2;
    const centerY = pathRect.top + pathRect.height / 2;
    
    const tooltipWidth = 200;
    const tooltipHeight = 100;
    
    // Position tooltip
    let x = centerX - tooltipWidth / 2;
    let y = centerY - tooltipHeight - 10; // Position above the path
    
    // Keep tooltip in viewport
    if (x < 10) x = 10;
    if (x + tooltipWidth > window.innerWidth - 10) x = window.innerWidth - tooltipWidth - 10;
    if (y < 10) y = pathRect.bottom + 10; // Position below if there's not enough space above
    
    this.infoPosition = { x, y };
  }
}