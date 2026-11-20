import { Component, AfterViewInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import '@lottiefiles/lottie-player';


@Component({
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class App implements AfterViewInit, OnDestroy {
  protected readonly title = signal('porto-rezi');
  protected readonly activeProcess = signal(0);
  protected processPaused = false;
  private processTimer?: ReturnType<typeof setInterval>;

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    this.processTimer = setInterval(() => {
  if (!this.processPaused) {
    this.activeProcess.set((this.activeProcess() + 1) % 4);
  }
}, 3000);

  }
  setProcess(i: number): void {
  this.activeProcess.set(i);
  this.processPaused = true;
}

resumeProcess(): void {
  this.processPaused = false;
}

ngOnDestroy(): void {
  if (this.processTimer) clearInterval(this.processTimer);
}

}
