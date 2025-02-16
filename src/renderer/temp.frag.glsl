#version 300 es

#ifdef GL_ES
precision mediump float;
#endif

out vec4 FragColor;  // Define the output color variable

float dot2( in vec2 v ) { return dot(v,v); }
float dot2( in vec3 v ) { return dot(v,v); }
float ndot( in vec2 a, in vec2 b ) { return a.x*b.x - a.y*b.y; }

uniform vec3 uni;

float Box3D( vec3 p, vec3 b )
{
    vec3 d = abs(p) - b;
    return min(max(d.x,max(d.y,d.z)),0.0) + length(max(d,0.0));
}


vec3 LocalHFCoord(vec3 p, vec3 plane_origin, vec3 plane_normal) {
    // Normalize the plane normal
    plane_normal = plane_normal / length(plane_normal);

    // Shift the point to the local coordinate system of the plane
    p = p - plane_origin;

    // Compute a robust x_axis
    vec3 arbitrary = abs(plane_normal.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
    vec3 x_axis = normalize(cross(arbitrary, plane_normal));

    // Compute the y_axis
    vec3 y_axis = normalize(cross(plane_normal, x_axis));

    // Project the point into the local coordinate system
    vec3 local_p = vec3(dot(p, x_axis), dot(p, y_axis), dot(p, plane_normal));
    return local_p;
}


float ApplyHeight( vec3 p, float sdf2d, float height )
{   

    vec2 d = vec2(sdf2d, max(p.z - height, -p.z));
    return min(max(d.x,d.y),0.0) + length(max(d,0.0));
}


vec2 iBox( in vec3 ro, in vec3 rd, in vec3 rad ) 
{
    vec3 m = 1.0/rd;
    vec3 n = m*ro;
    vec3 k = abs(m)*rad;
    vec3 t1 = -n - k;
    vec3 t2 = -n + k;
	return vec2( max( max( t1.x, t1.y ), t1.z ),
	             min( min( t2.x, t2.y ), t2.z ) );
}


vec2 SetMaterial( float sdf2d, float material_id )
{   
    vec2 res = vec2( sdf2d, material_id );
    return res;
}


vec2 MinRes( vec2 a, vec2 b )
{
    return (a.x<b.x) ? a : b;
}
vec2 MinRes( vec2 a, vec2 b , vec2 c)
{
    return MinRes(MinRes(a, b), c);
}
vec2 MinRes( vec2 a, vec2 b , vec2 c, vec2 d)
{
    return MinRes(MinRes(a, b), MinRes(c, d));
}

vec2 MinRes( vec2 a, vec2 b , vec2 c, vec2 d, vec2 e)
{
    return MinRes(MinRes(a, b), MinRes(c, d, e));
}



float Rectangle2D( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}


vec3 Rotate3D( vec3 p, vec3 angles )
{
    float cx = cos(angles.x), sx = sin(angles.x);
    float cy = cos(angles.y), sy = sin(angles.y);
    float cz = cos(angles.z), sz = sin(angles.z);
    mat3 rx = mat3(1.0, 0.0, 0.0, 0.0, cx, -sx, 0.0, sx, cx);
    mat3 ry = mat3(cy, 0.0, sy, 0.0, 1.0, 0.0, -sy, 0.0, cy);
    mat3 rz = mat3(cz, -sz, 0.0, sz, cz, 0.0, 0.0, 0.0, 1.0);
    return rz * ry * rx * p;
}


vec2 sdf_call_0(in vec3 pos_0){
    vec3 pos_1 = vec3(0, 0, 0) + pos_0;
vec3 pos_2 = LocalHFCoord(pos_1, vec3(0, 0, 0), vec3(0, 1, 0));
vec2 pos_2_xy = pos_2.xy;
float sdf_0 = Rectangle2D(pos_2_xy, vec2(0.500000000000000, 0.500000000000000));
float sdf_1 = ApplyHeight(pos_2, sdf_0, 3.000000000000000);
vec2 res = SetMaterial(sdf_1, 2.0);
    return res;
}


vec2 sdf_call_1(in vec3 pos_0){
    vec3 pos_1 = vec3(0, -1, 0) + pos_0;
vec3 pos_2 = Rotate3D(pos_1, uni);
float sdf_1 = Box3D(pos_2, vec3(0.1500000000000000, 0.1500000000000000, 0.1500000000000000));
// vec3 pos_3 = LocalHFCoord(pos_2, vec3(0, 0, 0), vec3(0, 1, 0));
// vec2 pos_3_xy = pos_3.xy;
// float sdf_0 = Rectangle2D(pos_3_xy, vec2(0.500000000000000, 0.500000000000000));
// float sdf_1 = ApplyHeight(pos_3, sdf_0, 1.000000000000000);
vec2 res = SetMaterial(sdf_1, 3.0);
    return res;
}


float SPACE_LIMIT=4.0;

vec2 OBJECT_SDF_AND_MATERIAL( in vec3 pos )
{
    vec2 res = vec2( pos.y, 0.0 );
    if( Box3D( pos, vec3(SPACE_LIMIT, SPACE_LIMIT, SPACE_LIMIT) ) < res.x )
    {   
        vec2 res_0 = sdf_call_0(pos);
        vec2 res_1 = sdf_call_1(pos);
        res = MinRes(res_0, res_1);
        
    }
    return res;
}

// Need to be coupled with a
// OBJECT_SDF_AND_MATERIAL
// utils


vec2 raycast( in vec3 ro, in vec3 rd )
{
    vec2 res = vec2(-1.0,-1.0);

    float tmin = 1.0;
    float tmax = 20.0;

    // raytrace floor plane
    float tp1 = (0.0-ro.y)/rd.y;
    if( tp1>0.0 )
    {
        tmax = min( tmax, tp1 );
        res = vec2( tp1, 1.0 );
    }
    //else return res;
    
    // raymarch primitives   
    vec2 tb = iBox( ro-vec3(0.0,0.4,-0.5), rd, vec3(6,6,6.0) );
    if( tb.x<tb.y && tb.y>0.0 && tb.x<tmax)
    {
        //return vec2(tb.x,2.0);
        tmin = max(tb.x,tmin);
        tmax = min(tb.y,tmax);

        float t = tmin;
        for( int i=0; i<70 && t<tmax; i++ )
        {
            vec2 h = OBJECT_SDF_AND_MATERIAL( ro+rd*t );
            if( abs(h.x)<(0.0001*t) )
            { 
                res = vec2(t,h.y); 
                break;
            }
            t += h.x;
        }
    }
    
    return res;
}

// https://iquilezles.org/articles/rmshadows
float calcSoftshadow( in vec3 ro, in vec3 rd, in float mint, in float tmax )
{
    // bounding volume
    float tp = (0.8-ro.y)/rd.y; if( tp>0.0 ) tmax = min( tmax, tp );

    float res = 1.0;
    float t = mint;
    for( int i=0; i<24; i++ )
    {
		float h = OBJECT_SDF_AND_MATERIAL( ro + rd*t ).x;
        float s = clamp(8.0*h/t,0.0,1.0);
        res = min( res, s );
        t += clamp( h, 0.01, 0.2 );
        if( res<0.004 || t>tmax ) break;
    }
    res = clamp( res, 0.0, 1.0 );
    return res*res*(3.0-2.0*res);
}

// https://iquilezles.org/articles/normalsSDF
vec3 calcNormal( in vec3 pos )
{
#if 0
    vec2 e = vec2(1.0,-1.0)*0.5773*0.0005;
    return normalize( e.xyy*OBJECT_SDF_AND_MATERIAL( pos + e.xyy ).x + 
					  e.yyx*OBJECT_SDF_AND_MATERIAL( pos + e.yyx ).x + 
					  e.yxy*OBJECT_SDF_AND_MATERIAL( pos + e.yxy ).x + 
					  e.xxx*OBJECT_SDF_AND_MATERIAL( pos + e.xxx ).x );
#else
    // inspired by tdhooper and klems - a way to prevent the compiler from inlining OBJECT_SDF_AND_MATERIAL() 4 times
    vec3 n = vec3(0.0);
    for( int i=0; i<4; i++ )
    {
        vec3 e = 0.5773*(2.0*vec3((((i+3)>>1)&1),((i>>1)&1),(i&1))-1.0);
        n += e*OBJECT_SDF_AND_MATERIAL(pos+0.0005*e).x;
      //if( n.x+n.y+n.z>100.0 ) break;
    }
    return normalize(n);
#endif    
}

// https://iquilezles.org/articles/nvscene2008/rwwtt.pdf
float calcAO( in vec3 pos, in vec3 nor )
{
	float occ = 0.0;
    float sca = 1.0;
    for( int i=0; i<5; i++ )
    {
        float h = 0.01 + 0.12*float(i)/4.0;
        float d = OBJECT_SDF_AND_MATERIAL( pos + h*nor ).x;
        occ += (h-d)*sca;
        sca *= 0.95;
        if( occ>0.35 ) break;
    }
    return clamp( 1.0 - 3.0*occ, 0.0, 1.0 ) * (0.5+0.5*nor.y);
}

// https://iquilezles.org/articles/checkerfiltering
float checkersGradBox( in vec2 p, in vec2 dpdx, in vec2 dpdy )
{
    // filter kernel
    vec2 w = abs(dpdx)+abs(dpdy) + 0.001;
    // analytical integral (box filter)
    vec2 i = 2.0*(abs(fract((p-0.5*w)*0.5)-0.5)-abs(fract((p+0.5*w)*0.5)-0.5))/w;
    // xor pattern
    return 0.5 - 0.5*i.x*i.y;                  
}


vec3 render( in vec3 ro, in vec3 rd, in vec3 rdx, in vec3 rdy )
{ 
    // ray -> color

    // background
    vec3 col = vec3(0.7, 0.7, 0.9) - max(rd.y,0.0)*0.3;
    
    // raycast scene
    vec2 res = raycast(ro,rd);
    float t = res.x;
	float m = res.y;

    // Material logic
    if( m>-0.5 )
    {
        vec3 pos = ro + t*rd;
        vec3 nor = (m<1.5) ? vec3(0.0,1.0,0.0) : calcNormal( pos );
        vec3 ref = reflect( rd, nor );
        
        // material        
        col = 0.2 + 0.2*sin( m*2.0 + vec3(0.0,1.0,2.0) );
        float ks = 1.0;
        
        if( m<1.5 )
        {
            // project pixel footprint into the plane
            vec3 dpdx = ro.y*(rd/rd.y-rdx/rdx.y);
            vec3 dpdy = ro.y*(rd/rd.y-rdy/rdy.y);

            float f = checkersGradBox( 3.0*pos.xz, 3.0*dpdx.xz, 3.0*dpdy.xz );
            col = 0.15 + f*vec3(0.05);
            ks = 0.4;
        }

        // lighting
        float occ = calcAO( pos, nor );
        
		vec3 lin = vec3(0.0);

        // sun
        {
            vec3  lig = normalize( vec3(-0.5, 0.4, -0.6) );
            vec3  hal = normalize( lig-rd );
            float dif = clamp( dot( nor, lig ), 0.0, 1.0 );
          //if( dif>0.0001 )
        	      dif *= calcSoftshadow( pos, lig, 0.02, 2.5 );
			float spe = pow( clamp( dot( nor, hal ), 0.0, 1.0 ),16.0);
                  spe *= dif;
                  spe *= 0.04+0.96*pow(clamp(1.0-dot(hal,lig),0.0,1.0),5.0);
                //spe *= 0.04+0.96*pow(clamp(1.0-sqrt(0.5*(1.0-dot(rd,lig))),0.0,1.0),5.0);
            lin += col*2.20*dif*vec3(1.30,1.00,0.70);
            lin +=     5.00*spe*vec3(1.30,1.00,0.70)*ks;
        }
        // sky
        {
            float dif = sqrt(clamp( 0.5+0.5*nor.y, 0.0, 1.0 ));
                  dif *= occ;
            float spe = smoothstep( -0.2, 0.2, ref.y );
                  spe *= dif;
                  spe *= 0.04+0.96*pow(clamp(1.0+dot(nor,rd),0.0,1.0), 5.0 );
          //if( spe>0.001 )
                  spe *= calcSoftshadow( pos, ref, 0.02, 2.5 );
            lin += col*0.60*dif*vec3(0.40,0.60,1.15);
            lin +=     2.00*spe*vec3(0.40,0.60,1.30)*ks;
        }
        // back
        {
        	float dif = clamp( dot( nor, normalize(vec3(0.5,0.0,0.6))), 0.0, 1.0 )*clamp( 1.0-pos.y,0.0,1.0);
                  dif *= occ;
        	lin += col*0.55*dif*vec3(0.25,0.25,0.25);
        }
        // sss
        {
            float dif = pow(clamp(1.0+dot(nor,rd),0.0,1.0),2.0);
                  dif *= occ;
        	lin += col*0.25*dif*vec3(1.00,1.00,1.00);
        }
        
		col = lin;

        col = mix( col, vec3(0.7,0.7,0.9), 1.0-exp( -0.0001*t*t*t ) );
    }

	return vec3( clamp(col,0.0,1.0) );
}



uniform vec3 origin;
uniform vec2 resolution;
uniform float cameraAngleX;
uniform float cameraAngleY;
uniform float cameraDistance;
uniform vec3 cameraOrigin;
// vec3 origin = vec3(0.0, 0.5, 0.0);
// float cameraAngleX = 0.25;
// float cameraAngleY = 0.5;
// float cameraDistance = 4.0;
int ZERO = 0;


// focal length
const float fl = 2.5;
#define AA 1   // make this 2 or 3 for antialiasing


mat3 setCamera( in vec3 ro, in vec3 ta, float cr )
{
	vec3 cw = normalize(ta-ro);
	vec3 cp = vec3(sin(cr), cos(cr),0.0);
    vec3 worldUp = vec3(0.0, 1.0, 0.0);
    if (abs(dot(worldUp, cw)) > 0.999) worldUp = vec3(1.0, 0.0, 0.0); // Avoid singularity
    vec3 cu = normalize(cross(worldUp, cw)); // Camera right vector
    vec3 cv = cross(cw, cu);    
    return mat3( cu, cv, cw );
}



void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // vec2 mo = iMouse.xy/iResolution.xy;
	float time = 32.0;

    vec2 mo = vec2(0.0, 0.0);
    // camera	
    // vec3 ta = vec3( 0.25, -0.75, -0.75 );
    // vec3 ro = ta + vec3( 4.5*cos(0.1*time + 7.0*mo.x), 2.2, 4.5*sin(0.1*time + 7.0*mo.x) );

    // camera	
    vec3 ta = vec3( 0.0, 1.0, -0.0 ) + cameraOrigin;
    vec3 ro = ta + cameraDistance * vec3(
        cos(cameraAngleX) * sin(cameraAngleY), // X component
        sin(cameraAngleX),                     // Y component (elevation)
        cos(cameraAngleX) * cos(cameraAngleY)  // Z component
    );
    // camera-to-world transformation
    mat3 ca = setCamera( ro, ta, 0.0 );
    vec3 tot = vec3(0.0);
    for( int m=ZERO; m<AA; m++ )
    for( int n=ZERO; n<AA; n++ )
    {
        // pixel coordinates
        vec2 o = vec2(float(m),float(n)) / float(AA) - 0.5;
        // vec2 p = (2.0*(fragCoord+o)-resolution.xy)/resolution.x;
        // vec2 p = (2.0*fragCoord-resolution.xy)/resolution.y;
        // p.y *= resolution.x / resolution.y; // Scale the x-axis by the aspect ratio
        // p = vec2(p.x, p.y * 1.5);
        vec2 p = (2.0 * fragCoord - resolution.xy) / resolution.xy;
        // p.y *= 1.5;//1280.÷0/720.0;
        // p.x *= resolution.x / resolution.y; // Aspect ratio adjustment
        // p.y *= resolution.x / resolution.y; // Aspect ratio adjustment
        vec3 rd = normalize(ca * vec3(p.x, p.y, fl)); // Ray direction
        
        // ray direction
        // vec3 rd = normalize(ca * vec3(p.x, p.y * (resolution.x / resolution.y), fl) );
        // rd.y *= 1.0;
         // ray differentials
        // vec2 px = (2.0*(fragCoord+vec2(1.0,0.0))-resolution.xy)/resolution.y;
        // vec2 py = (2.0*(fragCoord+vec2(0.0,1.0))-resolution.xy)/resolution.y;
        // vec3 rdx = ca * normalize( vec3(px,fl) );
        // vec3 rdy = ca * normalize( vec3(py,fl) );
        

        vec2 px = (2.0 * (fragCoord + vec2(1.0, 0.0)) - resolution.xy) / resolution.xy;
        // px.y *= 1.5;// 1280.0/720.0;   
        // px.x *= resolution.x / resolution.y; // Aspect ratio for x differential
        // px.y *= resolution.x / resolution.y; // Aspect ratio for x differential
        vec2 py = (2.0 * (fragCoord + vec2(0.0, 1.0)) - resolution.xy) / resolution.xy;
        // py.y *= 1.5;//1280.0/720.0;
        // py.x *= resolution.x / resolution.y; // Aspect ratio for y differential
        // py.y *= resolution.x / resolution.y; // Aspect ratio for y differential

        vec3 rdx = ca * normalize(vec3(px, fl));
        vec3 rdy = ca * normalize(vec3(py, fl));

        // render	
        vec3 col = render( ro, rd, rdx, rdy );

        // gain
        // col = col*3.0/(2.5+col);
        
		// gamma
        col = pow( col, vec3(0.4545) );

        tot += col;
    }
    tot /= float(AA*AA);
    
    fragColor = vec4( tot, 1.0 );
}


void main(void)
{
//   vec2 test = vec2(gl_FragCoord.x, gl_FragCoord.y );
  mainImage(FragColor, gl_FragCoord.xy);
}