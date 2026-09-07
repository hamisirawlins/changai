import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'

const MAPBOX_VERSION = 'v3.9.4'

export const useMapbox = (mapEl: Ref<HTMLElement | null>, center: [number, number]) => {
  const config = useRuntimeConfig()
  const token = config.public.mapboxToken as string
  const mapError = ref('')
  let map: any = null

  const log = (step: string, detail?: Record<string, unknown>) => console.info(`[mapbox] ${step}`, detail || {})

  const elementSnapshot = () => {
    const container = mapEl.value
    const wrapper = container?.closest('.map')
    const containerRect = container?.getBoundingClientRect()
    const wrapperRect = wrapper?.getBoundingClientRect()
    return {
      container: containerRect ? { width: containerRect.width, height: containerRect.height } : null,
      wrapper: wrapperRect ? { width: wrapperRect.width, height: wrapperRect.height } : null,
      computed: container ? { position: getComputedStyle(container).position, width: getComputedStyle(container).width, height: getComputedStyle(container).height } : null
    }
  }

  const loadLibrary = () => new Promise<any>((resolve, reject) => {
    log('load requested', { existingGlobal: Boolean((window as any).mapboxgl) })
    if ((window as any).mapboxgl) {
      log('using existing global')
      return resolve((window as any).mapboxgl)
    }
    if (!document.querySelector('link[data-mapbox-gl]')) {
      log('injecting css')
      const link = document.createElement('link')
      link.dataset.mapboxGl = 'true'
      link.rel = 'stylesheet'
      link.href = `https://api.mapbox.com/mapbox-gl-js/${MAPBOX_VERSION}/mapbox-gl.css`
      link.onload = () => log('css loaded')
      link.onerror = () => log('css failed')
      document.head.appendChild(link)
    } else {
      log('css already present')
    }
    const script = document.createElement('script')
    script.src = `https://api.mapbox.com/mapbox-gl-js/${MAPBOX_VERSION}/mapbox-gl.js`
    script.async = true
    script.onload = () => {
      log('script loaded', { hasMapboxGl: Boolean((window as any).mapboxgl) })
      resolve((window as any).mapboxgl)
    }
    script.onerror = () => {
      log('script failed')
      reject(new Error('Mapbox failed to load'))
    }
    log('injecting script')
    document.head.appendChild(script)
  })

  const init = async () => {
    log('init start', { tokenPresent: Boolean(token), tokenLength: token.length, center, elements: elementSnapshot() })
    if (!mapEl.value) {
      log('init stopped: container ref missing')
      return
    }
    if (!token) {
      mapError.value = 'Mapbox token missing'
      log('init stopped: token missing')
      return
    }
    try {
      const mapboxgl = await loadLibrary()
      log('library ready', { supported: typeof mapboxgl.supported === 'function' ? mapboxgl.supported() : 'unknown', version: mapboxgl.version, elements: elementSnapshot() })
      mapboxgl.accessToken = token
      map = new mapboxgl.Map({ container: mapEl.value, style: 'mapbox://styles/mapbox/satellite-streets-v12', center, zoom: 12.4, attributionControl: false })
      log('map instance created')
      map.once('render', () => log('first render', { elements: elementSnapshot() }))
      map.once('load', () => log('load event', { loaded: map.loaded(), elements: elementSnapshot() }))
      map.once('idle', () => log('idle event', { loaded: map.loaded(), elements: elementSnapshot() }))
      map.on('error', (event: unknown) => { mapError.value = 'Mapbox map unavailable'; log('error event', { event }) })
      map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-right')
      map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')
      new mapboxgl.Marker({ color: '#d62828' }).setLngLat(center).setPopup(new mapboxgl.Popup({ offset: 20 }).setText('Changai Garden City')).addTo(map)
      log('marker added')
    } catch (error) {
      mapError.value = 'Mapbox map unavailable'
      log('init failed', { error })
    }
  }

  onMounted(init)
  onBeforeUnmount(() => { log('unmount cleanup'); map?.remove() })

  return { mapError }
}
