import { Product } from '../types';
import sareeImage from '../assets/saree-product.jpg';
import sareeImage2 from '../assets/saree/saree2.jpg';
import sareeImage3 from '../assets/saree/saree3.jpg';
import kurtiImage from '../assets/kurti-product.jpg';
import jewelryImage from '../assets/jewelry-product.jpg';
import cookiesSaree1 from '../assets/saree/cookiesSaree1.jpg';
import cookiesSaree2 from '../assets/saree/cookiesSaree2.jpg';
import cookiesSaree3 from '../assets/saree/cookiesSaree3.jpg';
import cookiesSareePickok1 from '../assets/saree/cookiesSareePickok1.jpg';
import cookiesSareePickok2 from '../assets/saree/cookiesSareePickok2.jpg';
import cookiesSareePickok3 from '../assets/saree/cookiesSareePickok3.jpg';
import swetaSaree1 from '../assets/saree/swetaSaree1.jpg';
import swetaSaree2 from '../assets/saree/swetaSaree2.jpg';
import swetaSaree3 from '../assets/saree/swetaSaree3.jpg';
import sivaniLehega1 from '../assets/saree/sivaniLehega1.jpg';
import sivaniLehega2 from '../assets/saree/sivaniLehega2.jpg';
import sivaniLehega3 from '../assets/saree/sivaniLehega3.jpg';
import prenaSaree1 from '../assets/saree/prenaSaree1.jpg';
import prenaRedSaree1 from '../assets/saree/prenaRedSaree1.jpg';
import prenaRedSaree2 from '../assets/saree/prenaRedSaree2.jpg';

import antaraLehenga1 from '../assets/saree/antaraLehenga1.jpg';
import antaraLehenga2 from '../assets/saree/antaraLehenga2.jpg';
import antaraLehenga3 from '../assets/saree/antaraLehenga3.jpg';
import antaraLehenga4 from '../assets/saree/antaraLehenga4.jpg';
import sovanaLehega1 from '../assets/saree/sovanaLehega1.jpg';
import sovanaLehega2 from '../assets/saree/sovanaLehega2.jpg';
import sovanaLehega3 from '../assets/saree/sovanaLehega3.jpg';
import sovanaLehega4 from '../assets/saree/sovanaLehega4.jpg';
import smurtiCostSkert1 from '../assets/saree/smurtiCostSkert1.jpg';
import smurtiCostSkert2 from '../assets/saree/smurtiCostSkert2.jpg';
import smurtiCostSkert3 from '../assets/saree/smurtiCostSkert3.jpg';
import smurtiCostSkert4 from '../assets/saree/smurtiCostSkert4.jpg';
import antaraRedLehenga1 from '../assets/saree/antaraRedLehenga1.jpg';
import antaraRedLehenga2 from '../assets/saree/antaraRedLehenga2.jpg';
import antaraPaintingLehenga from '../assets/saree/antaraPaintingLehenga.jpg';
// import antaraPaintingLehenga from '../assets/saree/antaraPaintingLehenga.jpg';

import VibingCost from '../assets/saree/VibingCost.jpg';
import guduSaree from '../assets/saree/guduSaree.jpg';
import guduPaintingSaree from '../assets/saree/guduPaintingSaree.jpeg';
import cookessBlackSaree1 from '../assets/saree/cookessBlackSaree1.jpg';
import cookessBlackSaree2 from '../assets/saree/cookessBlackSaree2.jpg';
import cookessBlackSaree3 from '../assets/saree/cookessBlackSaree3.jpg';
import cookessBlackSaree4 from '../assets/saree/cookessBlackSaree4.jpg';
import whiteLehenga1 from '../assets/saree/whiteLehenga1.jpg';
import whiteLehenga2 from '../assets/saree/whiteLehenga2.jpg';

export const products: Product[] = [
  // Saree Section (6 products)
  {
    id: '1',
    name: 'Patachitra Silk Saree',
    price: 6999,
    description: 'Handwoven silk saree with traditional Odisha Patachitra, showcasing the rich heritage of our craftsmen.',
    image: [cookiesSaree1, cookiesSaree2, cookiesSaree3],
    category: 'sarees',
    sizes: ['Free Size'],
    colors: ['Royal Blue', 'Emerald Green', 'Deep Purple'],
    featured: true,
  },
  {
    id: '2',
    name: 'Patachitra Saree',
    price: 14999,
    description: 'Vibrant patterns from Odisha looms, featuring the iconic Sambalpuri weaving technique.',
    image: [swetaSaree1, swetaSaree2, swetaSaree3],
    category: 'sarees',
    sizes: ['Free Size'],
    colors: ['Red', 'Orange', 'Yellow'],
    featured: true,
  },
  {
    id: '3',
    name: 'patachitra painting Silk Saree',
    price: 5999,
    description: 'Intricate handwoven designs with traditional Bomkai patterns from Odisha.',
    image: [prenaSaree1, ],
    category: 'sarees',
    sizes: ['Free Size'],
    colors: ['Maroon', 'Gold', 'Green'],
  },
  {
    id: '4',
    name: 'Cotton Handloom Saree',
    price: 2999,
    description: 'Lightweight and elegant cotton saree perfect for daily wear and comfort.',
    image: [guduSaree,],
    category: 'sarees',
    sizes: ['Free Size'],
    colors: ['White', 'Cream', 'Light Pink'],
  },
  {
    id: '5',
    name: 'Tussar Silk Saree',
    price: 4499,
    description: 'Rich texture with golden hues, showcasing the beauty of Tussar silk weaving.',
    image: [cookiesSareePickok1, cookiesSareePickok2, cookiesSareePickok3],
    category: 'sarees',
    sizes: ['Free Size'],
    colors: ['Golden Yellow', 'Bronze', 'Copper'],
  },
  {
    id: '6',
    name: 'Banarasi Saree',
    price: 6999,
    description: 'Luxurious silk saree with intricate zari work, perfect for weddings and special occasions.',
    image: [prenaRedSaree1, prenaRedSaree2,],
    category: 'sarees',
    sizes: ['Free Size'],
    colors: ['Red Gold', 'Purple Gold', 'Green Gold'],
  },
  {
    id: '7',
    name: 'Banarasi Saree',
    price: 6999,
    description: 'Luxurious silk saree with intricate zari work, perfect for weddings and special occasions.',
    image: [guduPaintingSaree,],
    category: 'sarees',
    sizes: ['Free Size'],
    colors: ['Red Gold', 'Purple Gold', 'Green Gold'],
  },
  {
    id: '8',
    name: 'Banarasi Saree',
    price: 6999,
    description: 'Luxurious silk saree with intricate zari work, perfect for weddings and special occasions.',
    image: [cookessBlackSaree1,cookessBlackSaree2,cookessBlackSaree3,cookessBlackSaree4],
    category: 'sarees',
    sizes: ['Free Size'],
    colors: ['Red Gold', 'Purple Gold', 'Green Gold'],
  },

  // Lehenga Section (6 products)
 
  {
    id: '9',
    name: 'Anarkali Lehenga',
    price: 6499,
    description: 'Flowy design for festive occasions with traditional Anarkali silhouette.',
    image: [antaraLehenga1, antaraLehenga2, antaraLehenga3,antaraLehenga4],
    category: 'lehengas',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Purple', 'Teal', 'Magenta'],
  },
  {
    id: '10',
    name: 'Mirror Work Lehenga',
    price: 5499,
    description: 'Traditional Odisha mirror work with intricate handcrafted details.',
    image: [sovanaLehega1, sovanaLehega2, sovanaLehega3,sovanaLehega4],
    category: 'lehengas',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy Blue', 'Emerald', 'Burgundy'],
  },
  {
    id: '11',
    name: 'Silk Lehenga Set',
    price: 8999,
    description: 'Rich silk with heavy embroidery, perfect for grand celebrations.',
    image: [antaraRedLehenga1, antaraRedLehenga2,],
    category: 'lehengas',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gold', 'Silver', 'Rose Gold'],
  },
  {
    id: '12',
    name: 'Embroidered Sambalpuri Lehenga',
    price: 7999,
    description: 'Floral embroidery with dupatta, perfect for festive celebrations and weddings.',
    image: [sivaniLehega1, sivaniLehega2, sivaniLehega3],
    category: 'lehengas',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black'],
    featured: true,
  },

  {
    id: '13',
    name: 'Cotton Lehenga',
    price: 3999,
    description: 'Casual yet elegant design for comfortable festive wear.',
    image: [antaraPaintingLehenga,],
    category: 'lehengas',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Yellow', 'Orange', 'Pink'],
  },
  {
    id: '14',
    name: 'Bridal Lehenga',
    price: 9999,
    description: 'Opulent design for weddings with heavy work and premium fabrics.',
    image: [whiteLehenga1, whiteLehenga2, sareeImage],
    category: 'lehengas',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Deep Red', 'Royal Gold', 'Maroon'],
  },

  // Customized Garments Section (7 products)
  {
    id: '15',
    name: 'Custom Anarkali Suit',
    price: 5999,
    description: 'Tailored to your measurements with personalized embroidery and design.',
    image: [smurtiCostSkert1, smurtiCostSkert2, smurtiCostSkert3,smurtiCostSkert4],
    category: 'customized',
    sizes: ['Custom'],
    colors: ['As per choice'],
  },
  {
    id: '16',
    name: 'Embroidered Kurti',
    price: 2499,
    description: 'Customized with handwork and embroidery as per your preference.',
    image: [VibingCost,],
    category: 'customized',
    sizes: ['Custom'],
    colors: ['As per choice'],
  },
  {
    id: '17',
    name: 'Palazzo Suit',
    price: 4999,
    description: 'Personalized fit and design with matching palazzo and dupatta.',
    image: [kurtiImage, jewelryImage, sareeImage],
    category: 'customized',
    sizes: ['Custom'],
    colors: ['As per choice'],
  },
  {
    id: '18',
    name: 'Sharara Set',
    price: 5499,
    description: 'Custom embroidery for elegance with traditional Sharara style.',
    image: [kurtiImage, jewelryImage, sareeImage],
    category: 'customized',
    sizes: ['Custom'],
    colors: ['As per choice'],
  },
  {
    id: '19',
    name: 'Designer Blouse',
    price: 1999,
    description: 'Custom-made blouses for sarees with personalized fitting and design.',
    image: [kurtiImage, jewelryImage, sareeImage],
    category: 'customized',
    sizes: ['Custom'],
    colors: ['As per choice'],
  },
  {
    id: '20',
    name: 'Gown with Embroidery',
    price: 6999,
    description: 'Customized gowns for special occasions with intricate embroidery work.',
    image: [kurtiImage, jewelryImage, sareeImage],
    category: 'customized',
    sizes: ['Custom'],
    colors: ['As per choice'],
  },
  {
    id: '21',
    name: 'Handloom Kurta Set',
    price: 3499,
    description: 'Personalized traditional design using authentic Odisha handloom fabrics.',
    image: [kurtiImage, jewelryImage, sareeImage],
    category: 'customized',
    sizes: ['Custom'],
    colors: ['As per choice'],
  },

  // Kids Section (6 products)
  {
    id: '22',
    name: 'Kids Lehenga',
    price: 2499,
    description: 'Mini lehenga for festive wear, designed specially for little princesses.',
    image: [jewelryImage, sareeImage, kurtiImage],
    category: 'kids',
    sizes: ['2-3 years', '4-5 years', '6-7 years', '8-9 years'],
    colors: ['Pink', 'Purple', 'Red'],
  },
  {
    id: '23',
    name: 'Kids Kurta Set',
    price: 1999,
    description: 'Comfortable cotton kurta set for boys and girls, perfect for festivals.',
    image: [jewelryImage, sareeImage, kurtiImage],
    category: 'kids',
    sizes: ['2-3 years', '4-5 years', '6-7 years', '8-9 years'],
    colors: ['Blue', 'Yellow', 'Green'],
  },
  {
    id: '24',
    name: 'Embroidered Frock',
    price: 1799,
    description: 'Cute design for girls with beautiful embroidery and comfortable fit.',
    image: [jewelryImage, sareeImage, kurtiImage],
    category: 'kids',
    sizes: ['2-3 years', '4-5 years', '6-7 years', '8-9 years'],
    colors: ['Pink', 'White', 'Lavender'],
  },
  {
    id: '25',
    name: 'Traditional Dhoti Set',
    price: 2299,
    description: 'Festive wear for boys with traditional dhoti and kurta combination.',
    image: [jewelryImage, sareeImage, kurtiImage],
    category: 'kids',
    sizes: ['2-3 years', '4-5 years', '6-7 years', '8-9 years'],
    colors: ['Cream', 'White', 'Gold'],
  },
  {
    id: '26',
    name: 'Anarkali Dress',
    price: 2699,
    description: 'Elegant kids Anarkali dress perfect for special occasions and parties.',
    image: [jewelryImage, sareeImage, kurtiImage],
    category: 'kids',
    sizes: ['2-3 years', '4-5 years', '6-7 years', '8-9 years'],
    colors: ['Peach', 'Mint Green', 'Baby Pink'],
  },
  {
    id: '27',
    name: 'Cotton Frock',
    price: 1499,
    description: 'Lightweight and playful design for everyday wear and comfort.',
    image: [jewelryImage, sareeImage, kurtiImage],
    category: 'kids',
    sizes: ['2-3 years', '4-5 years', '6-7 years', '8-9 years'],
    colors: ['Floral Print', 'Polka Dots', 'Stripes'],
  },
];
