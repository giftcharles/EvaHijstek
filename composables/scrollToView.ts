import { useState, ref } from '#app'

const selected = ref("");
let timer: any = ref(null)

const scrollToView = (id) => {
    try {
        timer()
      } catch (error) {}
      selected.value = id;
      const yOffset = -103;
      const element: any = document.getElementById(id.replace("#", ""));
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      timer = setTimeout(() => {
        selected.value = null;
      }, 2000);

      return 
}

export const useSmoothScroll = () => {
    return useState('scrollToView', () => scrollToView)
}