import SwiftUI
import CoreLocation
import MapLibre

struct ContentView: View {
    @State private var mapView: MLNMapView? = nil
    @State private var selectedCoordinate: CLLocationCoordinate2D? = nil
    @State private var showResetToast: Bool = false
    
    // Posisi awal kamera ke Indonesia (sama persis dengan versi Android)
    private let indonesiaCenter = CLLocationCoordinate2D(latitude: -0.7893, longitude: 113.9213)
    private let initialZoom: Double = 4.5
    
    var body: some View {
        ZStack {
            // Tampilan Peta MapLibre
            MapLibreView(
                initialCenter: indonesiaCenter,
                initialZoom: initialZoom,
                onMapReady: { map in
                    self.mapView = map
                },
                onTapCoordinate: { coordinate in
                    withAnimation(.easeInOut(duration: 0.25)) {
                        self.selectedCoordinate = coordinate
                    }
                }
            )
            .ignoresSafeArea()
            
            // Banner Koordinat saat peta diketuk (Atas)
            if let coord = selectedCoordinate {
                VStack {
                    HStack(spacing: 10) {
                        Image(systemName: "mappin.circle.fill")
                            .font(.system(size: 20))
                            .foregroundColor(.white)
                        
                        Text(String(format: "Koordinat: Lat %.4f, Lon %.4f", coord.latitude, coord.longitude))
                            .font(.system(size: 14, weight: .semibold))
                            .foregroundColor(.white)
                        
                        Spacer()
                        
                        Button(action: {
                            withAnimation(.easeInOut(duration: 0.25)) {
                                selectedCoordinate = nil
                            }
                        }) {
                            Image(systemName: "xmark.circle.fill")
                                .font(.system(size: 18))
                                .foregroundColor(.white.opacity(0.85))
                        }
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 12)
                    .background(Color(red: 0.12, green: 0.53, blue: 0.90)) // #1E88E5
                    .cornerRadius(14)
                    .shadow(color: Color.black.opacity(0.25), radius: 8, x: 0, y: 4)
                    .padding(.horizontal, 16)
                    .padding(.top, 50)
                    
                    Spacer()
                }
                .transition(.move(edge: .top).combined(with: .opacity))
            }
            
            // Notifikasi Toast saat tombol Reset ditekan (Bawah tengah)
            if showResetToast {
                VStack {
                    Spacer()
                    Text("Kembali ke posisi awal (Indonesia)")
                        .font(.system(size: 13, weight: .medium))
                        .foregroundColor(.white)
                        .padding(.horizontal, 16)
                        .padding(.vertical, 10)
                        .background(Color.black.opacity(0.75))
                        .cornerRadius(20)
                        .padding(.bottom, 110)
                }
                .transition(.opacity)
            }
            
            // Tombol Kontrol Floating Action (Bawah kanan, sama persis dengan versi Android)
            VStack {
                Spacer()
                HStack {
                    Spacer()
                    VStack(spacing: 12) {
                        // Tombol Reset ke posisi Indonesia
                        Button(action: {
                            mapView?.setCenter(indonesiaCenter, zoomLevel: initialZoom, animated: true)
                            withAnimation {
                                showResetToast = true
                            }
                            DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
                                withAnimation {
                                    showResetToast = false
                                }
                            }
                        }) {
                            Image(systemName: "location.fill")
                                .font(.system(size: 16, weight: .bold))
                                .foregroundColor(.white)
                                .frame(width: 44, height: 44)
                                .background(Color(red: 0.12, green: 0.53, blue: 0.90)) // #1E88E5
                                .clipShape(Circle())
                                .shadow(color: Color.black.opacity(0.35), radius: 4, x: 0, y: 2)
                        }
                        
                        // Tombol Zoom In
                        Button(action: {
                            guard let map = mapView else { return }
                            map.setZoomLevel(map.zoomLevel + 1, animated: true)
                        }) {
                            Image(systemName: "plus")
                                .font(.system(size: 18, weight: .bold))
                                .foregroundColor(.white)
                                .frame(width: 44, height: 44)
                                .background(Color(red: 0.12, green: 0.53, blue: 0.90)) // #1E88E5
                                .clipShape(Circle())
                                .shadow(color: Color.black.opacity(0.35), radius: 4, x: 0, y: 2)
                        }
                        
                        // Tombol Zoom Out
                        Button(action: {
                            guard let map = mapView else { return }
                            map.setZoomLevel(map.zoomLevel - 1, animated: true)
                        }) {
                            Image(systemName: "minus")
                                .font(.system(size: 18, weight: .bold))
                                .foregroundColor(.white)
                                .frame(width: 44, height: 44)
                                .background(Color(red: 0.12, green: 0.53, blue: 0.90)) // #1E88E5
                                .clipShape(Circle())
                                .shadow(color: Color.black.opacity(0.35), radius: 4, x: 0, y: 2)
                        }
                    }
                    .padding(.trailing, 16)
                    .padding(.bottom, 36)
                }
            }
        }
    }
}
