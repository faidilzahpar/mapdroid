package com.mapdroid.app;

import android.os.Bundle;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import org.maplibre.android.MapLibre;
import org.maplibre.android.camera.CameraPosition;
import org.maplibre.android.camera.CameraUpdateFactory;
import org.maplibre.android.geometry.LatLng;
import org.maplibre.android.maps.MapView;
import org.maplibre.android.maps.MapLibreMap;
import org.maplibre.android.maps.OnMapReadyCallback;
import org.maplibre.android.maps.Style;

public class MainActivity extends AppCompatActivity implements OnMapReadyCallback {

    private MapView mapView;
    private MapLibreMap maplibreMap;
    // MapLibre official style JSON URL
    private static final String STYLE_URL = "https://demotiles.maplibre.org/style.json";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Inisialisasi MapLibre sebelum inflating MapView
        MapLibre.getInstance(this);

        setContentView(R.layout.activity_main);

        mapView = findViewById(R.id.mapView);
        mapView.onCreate(savedInstanceState);
        mapView.getMapAsync(this);

        FloatingActionButton fabZoomIn = findViewById(R.id.fabZoomIn);
        FloatingActionButton fabZoomOut = findViewById(R.id.fabZoomOut);
        FloatingActionButton fabReset = findViewById(R.id.fabReset);

        fabZoomIn.setOnClickListener(v -> {
            if (maplibreMap != null) {
                maplibreMap.animateCamera(CameraUpdateFactory.zoomIn());
            }
        });

        fabZoomOut.setOnClickListener(v -> {
            if (maplibreMap != null) {
                maplibreMap.animateCamera(CameraUpdateFactory.zoomOut());
            }
        });

        fabReset.setOnClickListener(v -> {
            if (maplibreMap != null) {
                // Pusatkan kamera ke Indonesia
                CameraPosition position = new CameraPosition.Builder()
                        .target(new LatLng(-0.7893, 113.9213))
                        .zoom(4.5)
                        .build();
                maplibreMap.animateCamera(CameraUpdateFactory.newCameraPosition(position));
                Toast.makeText(this, "Kembali ke posisi awal (Indonesia)", Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public void onMapReady(@NonNull MapLibreMap map) {
        this.maplibreMap = map;
        map.setStyle(STYLE_URL, new Style.OnStyleLoaded() {
            @Override
            public void onStyleLoaded(@NonNull Style style) {
                // Set posisi awal kamera ke Indonesia
                CameraPosition initialPosition = new CameraPosition.Builder()
                        .target(new LatLng(-0.7893, 113.9213))
                        .zoom(4.5)
                        .build();
                map.setCameraPosition(initialPosition);

                map.addOnMapClickListener(point -> {
                    Toast.makeText(MainActivity.this,
                            String.format("Koordinat: Lat %.4f, Lon %.4f", point.getLatitude(), point.getLongitude()),
                            Toast.LENGTH_SHORT).show();
                    return true;
                });
            }
        });
    }

    @Override
    protected void onStart() {
        super.onStart();
        mapView.onStart();
    }

    @Override
    protected void onResume() {
        super.onResume();
        mapView.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        mapView.onPause();
    }

    @Override
    protected void onStop() {
        super.onStop();
        mapView.onStop();
    }

    @Override
    protected void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);
        mapView.onSaveInstanceState(outState);
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
        mapView.onLowMemory();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mapView.onDestroy();
    }
}
