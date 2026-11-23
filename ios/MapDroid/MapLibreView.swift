import SwiftUI
import MapLibre
import CoreLocation

public struct MapLibreView: UIViewRepresentable {
    public typealias UIViewType = MLNMapView
    
    let initialCenter: CLLocationCoordinate2D
    let initialZoom: Double
    let onMapReady: (MLNMapView) -> Void
    let onTapCoordinate: (CLLocationCoordinate2D) -> Void
    
    public init(
        initialCenter: CLLocationCoordinate2D = CLLocationCoordinate2D(latitude: -0.7893, longitude: 113.9213),
        initialZoom: Double = 4.5,
        onMapReady: @escaping (MLNMapView) -> Void = { _ in },
        onTapCoordinate: @escaping (CLLocationCoordinate2D) -> Void = { _ in }
    ) {
        self.initialCenter = initialCenter
        self.initialZoom = initialZoom
        self.onMapReady = onMapReady
        self.onTapCoordinate = onTapCoordinate
    }
    
    public func makeUIView(context: Context) -> MLNMapView {
        let styleURL = URL(string: "https://demotiles.maplibre.org/style.json")
        let mapView = MLNMapView(frame: .zero, styleURL: styleURL)
        mapView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        mapView.setCenter(initialCenter, zoomLevel: initialZoom, animated: false)
        mapView.delegate = context.coordinator
        
        let tapGesture = UITapGestureRecognizer(target: context.coordinator, action: #selector(Coordinator.handleTap(_:)))
        mapView.addGestureRecognizer(tapGesture)
        
        DispatchQueue.main.async {
            onMapReady(mapView)
        }
        
        return mapView
    }
    
    public func updateUIView(_ uiView: MLNMapView, context: Context) {
    }
    
    public func makeCoordinator() -> Coordinator {
        Coordinator(onTap: onTapCoordinate)
    }
    
    public class Coordinator: NSObject, MLNMapViewDelegate {
        let onTap: (CLLocationCoordinate2D) -> Void
        
        init(onTap: @escaping (CLLocationCoordinate2D) -> Void) {
            self.onTap = onTap
        }
        
        @objc func handleTap(_ gesture: UITapGestureRecognizer) {
            guard let mapView = gesture.view as? MLNMapView else { return }
            let point = gesture.location(in: mapView)
            let coordinate = mapView.convert(point, toCoordinateFrom: mapView)
            onTap(coordinate)
        }
        
        public func mapView(_ mapView: MLNMapView, didFinishLoading style: MLNStyle) {
            print("MapLibre iOS style loaded successfully")
        }
    }
}
