package flyweight;

import java.util.*;

public class FontFactory {
    public static final Map<String, FontStyle> cache = new HashMap<>();
    public static FontStyle getFont(String name, int size, boolean bold){
        String key = name + "-" + size + "-" + bold;
        if(!cache.containsKey(key)){
            cache.put(key, new FontStyle(name, size, bold));
        }
        return cache.get(key);
    }

    public static int totalFontsCreated(){
        return cache.size();
    }
}
