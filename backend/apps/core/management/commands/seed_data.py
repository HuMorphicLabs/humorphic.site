import os
from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from apps.users.models import User
from apps.models_3d.models import Category, Model3D
from apps.products.models import RoboticsProduct

class Command(BaseCommand):
    help = 'Seeds initial Humorphic Lab database records (Admin, Categories, 3D Models, Products)'

    def handle(self, *args, **options):
        self.stdout.write("Seeding Humorphic Lab data...")

        # 1. Admin & Demo User
        admin_user, created = User.objects.get_or_create(
            username='admin',
            defaults={
                'email': 'admin@humorphic.lab',
                'first_name': 'Dr. Alex',
                'last_name': 'Vance',
                'role': 'admin',
                'organization': 'Humorphic Autonomous Robotics Bay',
                'is_staff': True,
                'is_superuser': True
            }
        )
        if created:
            admin_user.set_password('Humorphic2026!')
            admin_user.save()
            self.stdout.write(self.style.SUCCESS("Created admin user: admin / Humorphic2026!"))

        demo_user, created = User.objects.get_or_create(
            username='cybernaut',
            defaults={
                'email': 'engineer@humorphic.lab',
                'first_name': 'Elena',
                'last_name': 'Rostova',
                'role': 'engineer',
                'organization': 'Kinematics Division',
            }
        )
        if created:
            demo_user.set_password('RoboPass2026!')
            demo_user.save()
            self.stdout.write(self.style.SUCCESS("Created demo user: cybernaut / RoboPass2026!"))

        # 2. Categories
        cat_humanoid, _ = Category.objects.get_or_create(
            name='Humanoid Robotics',
            defaults={
                'slug': 'humanoid-robotics',
                'description': 'Full-body bipedal cybernetic humanoid platforms and chassis systems.',
                'icon_name': 'Bot'
            }
        )
        cat_manipulator, _ = Category.objects.get_or_create(
            name='Kinematic Manipulators',
            defaults={
                'slug': 'kinematic-manipulators',
                'description': 'Multi-axis articulated arm mechanisms with harmonic strain-wave gearing.',
                'icon_name': 'Cpu'
            }
        )
        cat_perception, _ = Category.objects.get_or_create(
            name='Sensors & Perception',
            defaults={
                'slug': 'sensors-perception',
                'description': 'Spatial LiDAR, multi-spectral stereo vision modules, and IMU hubs.',
                'icon_name': 'Eye'
            }
        )
        cat_actuator, _ = Category.objects.get_or_create(
            name='Cybernetic Actuators',
            defaults={
                'slug': 'cybernetic-actuators',
                'description': 'Brushless frameless servomotors with integrated 18-bit magnetic encoders.',
                'icon_name': 'Zap'
            }
        )

        # 3. Sample 3D GLB Models
        glb_magic_header = b'glTF' + (2).to_bytes(4, byteorder='little') + (12).to_bytes(4, byteorder='little')

        models_data = [
            {
                'name': 'Humorphic v5.04 Humanoid Platform',
                'slug': 'humorphic-v5-04-humanoid-platform',
                'description': 'Next-gen 32-DOF biomorphic autonomous humanoid featuring carbon-fiber chassis, dual 12.8 TFLOPS NPU, and whole-body balance control.',
                'category': cat_humanoid,
                'polygon_count': 64200,
                'is_featured': True,
                'filename': 'humorphic_v5_humanoid.glb',
            },
            {
                'name': '7-DOF Biomorphic Robotic Manipulator',
                'slug': '7-dof-biomorphic-robotic-manipulator',
                'description': 'Zero-backlash 7-degree-of-freedom carbon-titanium arm manipulator with 12kg payload and micro-force tactile sensor feedback.',
                'category': cat_manipulator,
                'polygon_count': 32400,
                'is_featured': True,
                'filename': 'kinematic_arm.glb',
            },
            {
                'name': 'Perception Sensor Turret & LiDAR Bay',
                'slug': 'perception-sensor-turret-lidar-bay',
                'description': 'Dual 4K stereo depth perception cameras paired with 360-degree real-time LiDAR point-cloud generator.',
                'category': cat_perception,
                'polygon_count': 18800,
                'is_featured': False,
                'filename': 'lidar_sensor_bay.glb',
            },
            {
                'name': 'Harmonic Strain-Wave Joint Actuator 180Nm',
                'slug': 'harmonic-strain-wave-joint-actuator-180nm',
                'description': 'Ultra-compact high-torque frameless BLDC motor integrated with 1:100 harmonic drive and 18-bit absolute encoder.',
                'category': cat_actuator,
                'polygon_count': 14200,
                'is_featured': True,
                'filename': 'joint_actuator_180nm.glb',
            },
        ]

        for m_data in models_data:
            if not Model3D.objects.filter(slug=m_data['slug']).exists():
                model_inst = Model3D(
                    name=m_data['name'],
                    slug=m_data['slug'],
                    description=m_data['description'],
                    category=m_data['category'],
                    polygon_count=m_data['polygon_count'],
                    is_featured=m_data['is_featured'],
                    uploaded_by=admin_user,
                    format='glb',
                )
                model_inst.model_file.save(m_data['filename'], ContentFile(glb_magic_header), save=False)
                model_inst.save()
                self.stdout.write(self.style.SUCCESS(f"Seeded 3D Model: {m_data['name']}"))

        # 4. Products
        products_data = [
            {
                'name': 'Strain-Wave Joint Actuator Kit',
                'sku': 'ACT-180-HAR',
                'description': 'Complete modular high-torque actuator kit with 48V driver and CAN-FD bus interface.',
                'price': 1450.00,
                'stock': 24,
                'category_name': 'Actuators',
                'specs': {'Torque': '180 Nm', 'Voltage': '48V DC', 'Reduction': '100:1', 'Weight': '1.2 kg'}
            },
            {
                'name': 'Stereo Depth & LiDAR Perception Pod',
                'sku': 'SEN-LIDAR-4K',
                'description': 'Multi-spectral 3D spatial vision node with onboard point-cloud transformer co-processor.',
                'price': 2890.00,
                'stock': 12,
                'category_name': 'Perception',
                'specs': {'Resolution': 'Dual 4K', 'LiDAR Range': '25m', 'Frame Rate': '60 FPS', 'Interface': 'GigE / USB-C'}
            },
            {
                'name': '700Wh Smart Lithium-Ion Cybernetic Battery',
                'sku': 'PWR-700-LI',
                'description': 'High-density Li-Ion pack featuring active thermal cooling, 48V rail, and 80A peak current discharge.',
                'price': 980.00,
                'stock': 35,
                'category_name': 'Power Systems',
                'specs': {'Capacity': '700 Wh', 'Nominal Voltage': '48V', 'Peak Current': '80A', 'Weight': '3.8 kg'}
            },
            {
                'name': 'CAN-FD Real-Time Master Controller Board',
                'sku': 'CTL-RTOS-8M',
                'description': 'Dual-core ARM Cortex-M7 board running deterministic micro-kernel RTOS with 8Mbps CAN-FD routing.',
                'price': 420.00,
                'stock': 50,
                'category_name': 'Compute & Bus',
                'specs': {'Clock': '480 MHz', 'Buses': '4x CAN-FD', 'Latency': '< 25 us', 'Power': '5V-24V'}
            }
        ]

        for p_data in products_data:
            if not RoboticsProduct.objects.filter(sku=p_data['sku']).exists():
                RoboticsProduct.objects.create(
                    name=p_data['name'],
                    sku=p_data['sku'],
                    description=p_data['description'],
                    price=p_data['price'],
                    stock=p_data['stock'],
                    category_name=p_data['category_name'],
                    specs=p_data['specs']
                )
                self.stdout.write(self.style.SUCCESS(f"Seeded Product: {p_data['name']}"))

        self.stdout.write(self.style.SUCCESS("Database seeding completed successfully!"))
