#define GLSLIFY 1
vec2 opU( vec2 d1, vec2 d2 )
{
	return (d1.x<d2.x) ? d1 : d2;
}

float sdSphere( vec3 p, float s )
{
    return length(p)-s;
}

vec2 sceneSDF(vec2 res, vec3 pos, vec3 origin) {
    
      res = opU( res, vec2( sdSphere(pos - origin, 0.25 ), 26.9 ) );
      return res;
}