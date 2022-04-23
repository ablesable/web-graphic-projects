uniform sampler2D uSampler; //the image data
uniform sampler2D uTextureOne;
uniform sampler2D uTextureTwo;
uniform sampler2D uTextureThree;

uniform mat3 mappedMatrix;

varying vec2 vTextureCoord; //The coordinates of the current pixel

void main(){

    vec3 map = vec3(vTextureCoord.xy,1.)*mappedMatrix;
    
    vec2 uv = map.xy;

    // vec2 uv = vec2(vTextureCoord.x + sin(vTextureCoord.y*10.)/10., vTextureCoord.y);
    gl_FragColor = texture2D(uTextureThree, uv);
    //gl_FragColor = vec4(uv,0.,1.);
}